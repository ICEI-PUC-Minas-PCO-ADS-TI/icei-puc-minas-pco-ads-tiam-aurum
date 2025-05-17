using System.ComponentModel.DataAnnotations.Schema;

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




    }
}
