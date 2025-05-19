using AurumApi.Data;
using AurumApi.DTO;
using AurumApi.Models;
using AurumApi.Service.Interface;
using Microsoft.EntityFrameworkCore;

namespace AurumApi.Service
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
    }
}
