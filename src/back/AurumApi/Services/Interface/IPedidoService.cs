using AurumApi.DTO;
using AurumApi.DTO.Response;

namespace AurumApi.Services.Interface
{
    public interface IPedidoService
    {
        Task<PedidoResponse> CriarPedidoAsync(int usuarioId, PedidoCreateDTO PedidoDto);
    }
}
