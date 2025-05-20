using AurumApi.Data;
using AurumApi.DTO;
using AurumApi.DTO.Response;
using AurumApi.Models;
using AurumApi.Services.Interface;
using Microsoft.EntityFrameworkCore;

namespace AurumApi.Services
{
    public class UsuarioService : IUsuarioService
    {

        private readonly AurumDataContext _aurumDataContext;

        public UsuarioService(AurumDataContext aurumDataContext)
        {
            _aurumDataContext = aurumDataContext;
        }

        public async Task<Usuario> CadastrarUsuarioAsync(UsuarioDTO usuarioDTO)
        {

            if(usuarioDTO == null || !VerificarDadosUsuario(usuarioDTO))
            {
                throw new ArgumentException("Dados Inválidos");
            }

            if (existeUsuario(usuarioDTO))
            {
                throw new ArgumentException("Usuário já cadastrado");
            }
            Usuario newUsuario = usuarioDTO.toEntity();
            _aurumDataContext.Add(newUsuario);
            await _aurumDataContext.SaveChangesAsync();


            return newUsuario;
        }

        public async Task<List<UsuarioDTO>> GetUsuarios()
        {
            var usuarios = await _aurumDataContext.Usuarios.ToListAsync();
            var usuariosDTO = new List<UsuarioDTO>();
            usuariosDTO = usuarios.Select(u => u.toDTO()).ToList();
            return usuariosDTO;
        }

        private bool VerificarDadosUsuario(UsuarioDTO usuarioDTO)
        {
            if (string.IsNullOrEmpty(usuarioDTO.Senha) ||
                string.IsNullOrEmpty(usuarioDTO.Documento) ||
                string.IsNullOrEmpty(usuarioDTO.Email) ||
                string.IsNullOrEmpty(usuarioDTO.Nome))
            {
                return false;  
            }

            return true; 
        }

        private bool existeUsuario(UsuarioDTO usuarioDTO)
        {
            var usuarioValido = _aurumDataContext.Usuarios
                .FirstOrDefault(u => u.Documento == usuarioDTO.Documento || u.Email == usuarioDTO.Email);


            return usuarioValido != null ? true : false;
        }

        public async Task<Response<UsuarioDTO>> AtualizarAsync(UsuarioDTO usuarioDTO)
        {
            var usuario = await _aurumDataContext.Usuarios.FindAsync(usuarioDTO.id);

            if (usuario == null)
            {
                return new Response<UsuarioDTO>
                {
                    Success = false,
                    Message = "Usuário não encontrado",
                    Data = null
                };
            }

            usuario.Nome = usuarioDTO.Nome;
            usuario.Email = usuarioDTO.Email;
            usuario.Senha = usuarioDTO.Senha;

            _aurumDataContext.Usuarios.Update(usuario);
            await _aurumDataContext.SaveChangesAsync();

            return new Response<UsuarioDTO>
            {
                Success = true,
                Message = "Usuário atualizado com sucesso",
                Data = usuario.toDTO()
            };
        }


    }
}
