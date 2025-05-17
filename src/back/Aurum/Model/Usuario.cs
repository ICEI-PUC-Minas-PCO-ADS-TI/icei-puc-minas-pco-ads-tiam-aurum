using System.ComponentModel.DataAnnotations.Schema;

namespace Aurum.Model
{
    [Table("usuario", Schema = "public")]
    public class Usuario
    {
        [Column("id")]  
        public int Id { get; set; }

        [Column("cpf")]  
        public string? Cpf { get; set; }

        [Column("email")]  
        public string? Email { get; set; }

        [Column("nome")]  
        public string? Nome { get; set; }

        [Column("senha")] 
        public string? Senha { get; set; }
    }
}
