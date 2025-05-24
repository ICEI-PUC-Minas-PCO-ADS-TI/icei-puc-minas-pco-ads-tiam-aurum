using AurumApi.DTO;
using AurumApi.DTO.Response;
using AurumApi.Models;

namespace AurumApi.Services.Interface
{
    public interface IUsuarioService
    {
        Task<Usuario> CadastrarUsuarioAsync(UsuarioDTO usuarioDTO);
        Task<List<UsuarioDTO>> GetUsuarios();
        Task<Response<UsuarioDTO>> AtualizarAsync(UsuarioDTO usuarioDTO);
        Task<UsuarioDTO> GetUsuarioByIdAsync(int id);
        Task<List<UsuarioDTO>> GetUsuarioByNomeAsync(string nome);
    }
}
