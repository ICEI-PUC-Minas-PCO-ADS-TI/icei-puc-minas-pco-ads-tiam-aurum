using System.ComponentModel.DataAnnotations.Schema;

namespace AurumApi.Models
{
    [Table("clientes")]
    public class Cliente
    {
        [Column("id")]
        public int Id { get; set; }  // Chave primária
        [Column("nome")]
        public string? Nome { get; set; }
        [Column("documento")]
        public string? Documento { get; set; }
        [Column("telefone")]
        public string? Telefone { get; set; }

        [Column("datacadastro")]
        public DateTime DataCadastro { get; set; }

        [Column("usuarioid")]
        public Usuario? Usuario { get; set; }
    }

}
