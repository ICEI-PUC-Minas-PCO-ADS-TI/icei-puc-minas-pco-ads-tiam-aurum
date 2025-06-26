using AurumApi.DTO;
using AurumApi.DTO.Response;
using AurumApi.Enum;

namespace AurumApi.Services.Interface
{
    public interface IPedidoService
    {
        Task<IEnumerable<PedidoResponse>> GetPedidosByUsuarioId(int usuarioId);
        Task<PedidoResponse> GetPedidoById(int id);
        Task<IEnumerable<PedidoResponse>> GetPedidosByClienteId(int clienteId);
        Task<PedidoResponse> CreatePedido(int usuarioId, PedidoCreateDTO PedidoDto);
        Task<bool> DeletePedido(int id);
        Task<bool> RegistrarDevolucaoOuTroca(int joiaId, int tipo);
        Task<IEnumerable<PedidoResponse>> GetPedidosPorTipo(ETipoPedido tipo);
        Task<IEnumerable<PedidoResponse>> GetPedidosPorClienteETipo(int clienteId, ETipoPedido tipo);



    }


}
