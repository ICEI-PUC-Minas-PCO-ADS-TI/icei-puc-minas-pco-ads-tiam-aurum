using AurumApi.DTO;
using AurumApi.DTO.Response;

namespace AurumApi.Services.Interface
{
    public interface IPedidoService
    {
        Task<IEnumerable<PedidoResponse>> GetPedidosByUsuarioId(int usuarioId);
        Task<PedidoResponse> GetPedidoById(int id);
        Task<IEnumerable<PedidoResponse>> GetPedidosByClienteId(int clienteId);
        Task<PedidoResponse> CreatePedidoAsync(int usuarioId, PedidoCreateDTO PedidoDto);
    }
}
