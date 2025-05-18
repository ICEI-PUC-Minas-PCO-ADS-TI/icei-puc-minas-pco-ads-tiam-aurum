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
        public string? senha { get; set; }
        [Column("documento")]
        public string? Documento { get; set; }


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
