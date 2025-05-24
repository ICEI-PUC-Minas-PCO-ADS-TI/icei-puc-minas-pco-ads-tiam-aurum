using AurumApi.Models;

namespace AurumApi.DTO
{
    public class UsuarioDTO
    {
        public int id { get; set; }
        public string? Email { get; set; }
        public string? Nome { get; set; }
        public string? Senha { get; set; }
        public string? Documento { get; set; }


        public Usuario toEntity() {
            Usuario entity = new Usuario();
            entity.Id = id;
            entity.Nome = Nome;
            entity.Documento = Documento;
            entity.Email = Email;
            entity.Senha = Senha;

            return entity;
        }
    }
}
