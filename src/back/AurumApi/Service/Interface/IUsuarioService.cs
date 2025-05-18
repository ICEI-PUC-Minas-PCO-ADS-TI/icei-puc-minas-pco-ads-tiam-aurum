using AurumApi.DTO;
using AurumApi.Models;

namespace AurumApi.Service.Interface
{
    public interface IUsuarioService
    {
        Task<Usuario> CadastrarUsuarioAsync(UsuarioDTO usuarioDTO);
        Task<List<UsuarioDTO>> GetUsuarios();
    }
}
