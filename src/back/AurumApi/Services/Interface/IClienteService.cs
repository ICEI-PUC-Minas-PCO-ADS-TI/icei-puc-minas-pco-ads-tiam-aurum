using AurumApi.DTO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AurumApi.Services
{
    public interface IClienteService
    {
        Task<IEnumerable<ClienteDTO>> ObterTodos();
        Task<ClienteDTO> ObterPorId(int id);
        Task<ClienteDTO> Criar(ClienteDTO clienteDTO);
        Task<bool> Atualizar(int id, ClienteDTO clienteDTO);
        Task<bool> Remover(int id);
        Task<bool> VerificarExistencia(int id);
    }
}
