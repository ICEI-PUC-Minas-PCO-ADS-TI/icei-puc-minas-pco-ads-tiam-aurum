using System.ComponentModel.DataAnnotations.Schema;

namespace AurumApi.Models
{
    [Table("enderecoclientes")]
    public class EnderecoCliente
    {
        [Column("id")]
        public int Id { get; set; }  // Chave primária
        [Column("cep")]
        public string? Cep { get; set; }
        [Column("logradouro")]
        public string? Logradouro { get; set; }
        [Column("numero")]
        public string? Numero { get; set; }
        [Column("complemento")]
        public string? Complemento { get; set; }
        [Column("bairro")]
        public string? Bairro { get; set; }
        [Column("cidade")]
        public string? Cidade { get; set; }
        [Column("estado")]
        public string? Estado { get; set; }
        [Column("clienteid")]
        public Cliente? Cliente { get; set; }
    }
}
