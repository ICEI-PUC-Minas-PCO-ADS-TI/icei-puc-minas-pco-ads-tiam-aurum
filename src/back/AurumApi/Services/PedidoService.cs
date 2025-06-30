using AurumApi.Data;
using AurumApi.DTO;
using AurumApi.DTO.Response;
using AurumApi.Enum;
using AurumApi.Models;
using AurumApi.Services.Interface;
using Microsoft.EntityFrameworkCore;

namespace AurumApi.Services
{
    public class PedidoService : IPedidoService
    {
        private readonly AurumDataContext _aurumDataContext;
        public PedidoService(AurumDataContext aurumDataContext)
        {
            _aurumDataContext = aurumDataContext;
        }
        public async Task<IEnumerable<PedidoResponse>> GetPedidosByUsuarioId(int usuarioId)
        {
            var pedidos = await _aurumDataContext.Pedidos
                .AsNoTracking()
                .Where(j => j.UsuarioId == usuarioId)
                .OrderByDescending(j => j.DataPedido)
                .ToListAsync();

            if (!pedidos.Any())
                throw new InvalidOperationException($"Nenhum pedido encontrado para o usuário {usuarioId}.");

            return pedidos.Select(p => new PedidoResponse
            {
                Id = p.Id,
                UsuarioId = p.UsuarioId,
                ClienteId = p.ClienteId,
                DataPedido = p.DataPedido,
                ValorTotal = p.ValorTotal
            });
        }

        public async Task<PedidoResponse> GetPedidoById(int id)
        {
            if (id <= 0)
                throw new ArgumentException("Pedido inválido.");

            var pedido = await _aurumDataContext.Pedidos
                .AsNoTracking()
                .FirstOrDefaultAsync(p => p.Id == id);

            if (pedido == null)
                throw new InvalidOperationException($"Pedido com ID {id} não encontrado.");

            return new PedidoResponse
            {
                Id = pedido.Id,
                UsuarioId = pedido.UsuarioId,
                ClienteId = pedido.ClienteId,
                DataPedido = pedido.DataPedido,
                ValorTotal = pedido.ValorTotal
            };
        }

        public async Task<IEnumerable<PedidoResponse>> GetPedidosByClienteId(int clienteId)
        {
            var pedidos = await _aurumDataContext.Pedidos
                .AsNoTracking()
                .Where(j => j.ClienteId == clienteId)
                .OrderByDescending(j => j.DataPedido)
                .ToListAsync();

            if (!pedidos.Any())
                throw new InvalidOperationException($"Nenhum pedido encontrado para o cliente {clienteId}.");

            return pedidos.Select(p => new PedidoResponse
            {
                Id = p.Id,
                UsuarioId = p.UsuarioId,
                ClienteId = p.ClienteId,
                DataPedido = p.DataPedido,
                ValorTotal = p.ValorTotal
            });
        }

        public async Task<PedidoResponse> CreatePedido(int usuarioId, PedidoCreateDTO dto)
        {
            // carrinho vazio
            if (dto.Itens == null || !dto.Itens.Any())
                throw new ArgumentException("Pedido deve conter pelo menos um item.");

            decimal valorTotal = 0;

            var cliente = await _aurumDataContext.Clientes.FirstOrDefaultAsync(c => c.Documento == dto.CPFCliente)
                ?? throw new InvalidOperationException($"Cliente com o CPF: {dto.CPFCliente} não encontrado");

            var novoPedido = new Pedido
            {
                UsuarioId = usuarioId,
                ClienteId = cliente.Id,
                DataPedido = DateTime.UtcNow,
                ValorTotal = 0, // vai atualizado depois de calcular os itens do pedido
                Tipo = Enum.ETipoPedido.Compra
            };

            await _aurumDataContext.Pedidos.AddAsync(novoPedido);
            await _aurumDataContext.SaveChangesAsync();

            var joiasIds = dto.Itens.Select(i => i.JoiaId).ToList(); // pega os IDs das joias do carrinho
            // pega as joias selecionadas
            var joias = await _aurumDataContext.Joias
                .Where(j => joiasIds.Contains(j.Id) && j.UsuarioId == usuarioId)
                .ToListAsync();

            foreach (var item in dto.Itens)
            {
                // percorre por cada joia para criar o JoiaPedido
                var joia = joias.FirstOrDefault(j => j.Id == item.JoiaId);

                if (joia == null)
                    throw new InvalidOperationException($"Joia com ID {item.JoiaId} não encontrada.");

                if (joia.Quantidade < item.Quantidade)
                    throw new ArgumentException($"Estoque insuficiente para a joia {joia.Nome}. Disponível: {joia.Quantidade}");

                var subTotal = joia.Preco * item.Quantidade;
                valorTotal += subTotal; // vai somando o total do pedido

                var joiaPedido = new JoiaPedido
                {
                    PedidoId = novoPedido.Id,
                    JoiaId = item.JoiaId,
                    Quantidade = item.Quantidade,
                    PrecoUnidade = joia.Preco,
                    Subtotal = subTotal
                };

                joia.Quantidade -= item.Quantidade; // atualiza o estoque

                _aurumDataContext.JoiasPedidos.Add(joiaPedido);
                _aurumDataContext.Joias.Update(joia); // atualiza no banco
            }

            novoPedido.ValorTotal = valorTotal; // depois de percorrer todas as joias atualiza o total do pedido

            // geração dos pagamentos (parcelas se houver)
            if (dto.Pagamento != null)
            {
                // define as informações base de cada pagamento
                int qtdParcelas = dto.Pagamento.QtdParcelas;
                decimal valorParcela = Math.Round(valorTotal / qtdParcelas, 2);
                var vencimento = DateTime.SpecifyKind(dto.Pagamento.DataPrimeiroVencimento, DateTimeKind.Utc);

                for (int i = 1; i <= qtdParcelas; i++)
                {
                    var pagamento = new Pagamento();
                    if (dto.Pagamento.FormaPagamento == "Cartão")
                    {
                        pagamento = new Pagamento
                        {
                            PedidoId = novoPedido.Id,
                            ClienteId = novoPedido.ClienteId,
                            UsuarioId = usuarioId,
                            QtdParcelas = qtdParcelas,
                            ValorParcela = valorParcela,
                            DataPagamento = DateTime.UtcNow,
                            DataVencimento = vencimento.AddMonths(i - 1),
                            Status = "Pago",
                            FormaPagamento = dto.Pagamento.FormaPagamento,
                            NumeroParcela = i,
                            ValorPagamento = valorTotal
                        };
                    } else
                    {
                        pagamento = new Pagamento
                        {
                            PedidoId = novoPedido.Id,
                            ClienteId = novoPedido.ClienteId,
                            UsuarioId = usuarioId,
                            QtdParcelas = qtdParcelas,
                            ValorParcela = valorParcela,
                            DataPagamento = null,
                            DataVencimento = vencimento.AddMonths(i - 1), // adiciona os meses de vencimento conforme a quantidade de parcela
                            Status = "Pendente",
                            FormaPagamento = dto.Pagamento.FormaPagamento,
                            NumeroParcela = i, // altera o número da parcela
                            ValorPagamento = valorTotal
                        };
                    }
                    _aurumDataContext.Pagamentos.Add(pagamento);
                }
            }

            await _aurumDataContext.SaveChangesAsync();

            var pagamentosResponse = await _aurumDataContext.Pagamentos
                .Where(p => p.PedidoId == novoPedido.Id)
                .Select(p => new PagamentoResponseDTO
                {
                    Id = p.Id,
                    QtdParcelas = p.QtdParcelas,
                    ValorParcela = p.ValorParcela,
                    DataPagamento = p.DataPagamento,
                    DataVencimento = p.DataVencimento,
                    Status = p.Status,
                    FormaPagamento = p.FormaPagamento,
                    NumeroParcela = p.NumeroParcela,
                    ValorPagamento = p.ValorPagamento
                })
                .ToListAsync();

            return new PedidoResponse
            {
                Id = novoPedido.Id,
                UsuarioId = novoPedido.UsuarioId,
                ClienteId = novoPedido.ClienteId,
                DataPedido = novoPedido.DataPedido,
                ValorTotal = novoPedido.ValorTotal,
                Pagamentos = pagamentosResponse
            };
        }

        public async Task<bool> DeletePedido(int id)
        {
            if (id <= 0)
                throw new ArgumentException("Pedido inválido.");

            var pedido = await _aurumDataContext.Pedidos
                .Include(p => p.JoiasPedidos)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (pedido == null)
                throw new InvalidOperationException($"Pedido com ID {id} não encontrado.");

            if (await PossuiPagamentos(id))
                throw new ArgumentException($"Pedido com ID {id} não pode ser excluído, pois possui pagamentos associados.");

            foreach (var item in pedido.JoiasPedidos)
            {
                var joia = await _aurumDataContext.Joias.FirstOrDefaultAsync(j => j.Id == item.JoiaId);
                if (joia != null)
                {
                    joia.Quantidade += item.Quantidade;
                    _aurumDataContext.Joias.Update(joia);
                }
            }

            _aurumDataContext.JoiasPedidos.RemoveRange(pedido.JoiasPedidos);
            _aurumDataContext.Pedidos.Remove(pedido);

            return await _aurumDataContext.SaveChangesAsync() > 0;
        }

        private async Task<bool> PossuiPagamentos(int id)
        {
            return await _aurumDataContext.Pagamentos.AnyAsync(p => p.PedidoId == id);
        }


        public async Task<bool> RegistrarDevolucaoOuTroca(int joiaId, int tipo)
        {
            if (joiaId <= 0)
                throw new ArgumentException("ID da joia inválido.");

            var joia = await _aurumDataContext.Joias.FirstOrDefaultAsync(j => j.Id == joiaId);

            if (joia == null)
                throw new InvalidOperationException($"Joia com ID {joiaId} não encontrada.");

            switch (tipo)
            {
                case 2:
                    joia.Status = "Devolução";
                    break;
                case 3:
                    joia.Status = "Troca";
                    break;
                default:
                    throw new ArgumentException("Tipo inválido. Use 2 para devolução ou 3 para troca.");
            }

            _aurumDataContext.Joias.Update(joia);
            return await _aurumDataContext.SaveChangesAsync() > 0;
        }

        public async Task<IEnumerable<PedidoResponse>> GetPedidosPorTipo(ETipoPedido tipo)
        {
            var pedidos = await _aurumDataContext.Pedidos
                .AsNoTracking()
                .Where(p => p.Tipo.HasValue && p.Tipo.Value == tipo)
                .OrderByDescending(p => p.DataPedido)
                .ToListAsync();

            if (!pedidos.Any())
                throw new InvalidOperationException($"Nenhum pedido do tipo {tipo} foi encontrado.");

            return pedidos.Select(p => new PedidoResponse
            {
                Id = p.Id,
                UsuarioId = p.UsuarioId,
                ClienteId = p.ClienteId,
                DataPedido = p.DataPedido,
                ValorTotal = p.ValorTotal
            });
        }


    }
}
