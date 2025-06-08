using AurumApi.Data;
using AurumApi.DTO;
using AurumApi.DTO.Response;
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

            if (pedidos is null)
                throw new InvalidOperationException($"Usuário com ID {usuarioId} não existe, ou não possui pedidos.");

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

            if (pedidos is null)
                throw new InvalidOperationException($"Usuário com ID {clienteId} não existe, ou não possui pedidos.");

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
            if (dto.Itens == null || !dto.Itens.Any())
                throw new ArgumentException("Pedido deve conter pelo menos um item.");

            decimal valorTotal = 0;

            var novoPedido = new Pedido
            {
                UsuarioId = usuarioId,
                ClienteId = dto.ClienteId,
                DataPedido = DateTime.UtcNow,
                ValorTotal = 0
            };

            await _aurumDataContext.Pedidos.AddAsync(novoPedido);
            await _aurumDataContext.SaveChangesAsync();

            foreach (var item in dto.Itens)
            {
                var joia = await _aurumDataContext.Joias.FirstOrDefaultAsync(j => j.Id == item.JoiaId && j.UsuarioId == usuarioId);

                if (joia == null)
                    throw new InvalidOperationException($"Joia com ID {item.JoiaId} não encontrada.");

                if (joia.Quantidade < item.Quantidade)
                    throw new ArgumentException($"Estoque insuficiente para a joia {joia.Nome}. Disponível: {joia.Quantidade}");

                var subTotal = joia.Preco * item.Quantidade;
                valorTotal += subTotal;

                var joiaPedido = new JoiaPedido
                {
                    PedidoId = novoPedido.Id,
                    JoiaId = item.JoiaId,
                    Quantidade = item.Quantidade,
                    PrecoUnidade = joia.Preco,
                    Subtotal = subTotal
                };

                joia.Quantidade -= item.Quantidade;

                _aurumDataContext.JoiasPedidos.Add(joiaPedido);
                _aurumDataContext.Joias.Update(joia);
            }

            novoPedido.ValorTotal = valorTotal;
            await _aurumDataContext.SaveChangesAsync();

            return new PedidoResponse
            {
                Id = novoPedido.Id,
                UsuarioId = novoPedido.UsuarioId,
                ClienteId = novoPedido.ClienteId,
                DataPedido = novoPedido.DataPedido,
                ValorTotal = novoPedido.ValorTotal
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

    }
}
