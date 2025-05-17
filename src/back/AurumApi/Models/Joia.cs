using System.ComponentModel.DataAnnotations.Schema;

namespace AurumApi.Models
{
    [Table("joias")]
    public class Joia
    {
        [Column("id")]
        public int Id { get; set; }
        [Column("descricao")]
        public string? Descricao { get; set; }
        [Column("preco")]
        public decimal Preco { get; set; }
        [Column("quantidade")]
        public int Quantidade { get; set; }
        [Column("usuarioid")]
        public Usuario? Usuario { get; set; }
    }
}
