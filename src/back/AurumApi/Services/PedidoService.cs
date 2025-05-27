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
        public async Task<PedidoResponse> CriarPedidoAsync(int usuarioId, PedidoCreateDTO dto)
        {
            if(dto.Itens == null || !dto.Itens.Any())
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

            foreach(var item in dto.Itens)
            {
                var joia = await _aurumDataContext.Joias.FirstOrDefaultAsync(j => j.Id == item.JoiaId && j.UsuarioId == usuarioId);

                if(joia == null)
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
                UsuarioId = novoPedido.UsuarioId,
                ClienteId = novoPedido.ClienteId,
                DataPedido = novoPedido.DataPedido,
                ValorTotal = novoPedido.ValorTotal
            };
        }
    }
}
