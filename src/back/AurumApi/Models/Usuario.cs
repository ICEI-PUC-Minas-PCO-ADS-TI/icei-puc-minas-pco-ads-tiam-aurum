using System.ComponentModel.DataAnnotations.Schema;
using AurumApi.DTO;

namespace AurumApi.Models
{
    [Table("usuarios")]
    public class Usuario
    {
        [Column("id")]
        public int Id { get; set; }
        [Column("email")]
        public string Email { get; set; }
        [Column("nome")]
        public string? Nome { get; set; }
        [Column("senhacriptografada")]
        public string? Senha { get; set; }
        [Column("documento")]
        public string? Documento { get; set; }

        public ICollection<Joia> Joias { get; set; } = new List<Joia>();
        public ICollection<Cliente> Clientes { get; set; } = new List<Cliente>();
        public ICollection<Pedido> Pedidos { get; set; } = new List<Pedido>();

        public UsuarioDTO toDTO()
        {
            UsuarioDTO dto = new UsuarioDTO();
            dto.id = Id;
            dto.Email = Email;
            dto.Nome = Nome;
            dto.Documento = Documento;
            return dto;
        }



    }
}
