using System.ComponentModel.DataAnnotations.Schema;

namespace AurumApi.Models
{
    [Table("joias")]
    public class Joia
    {

        [Column("id")]
        public int Id { get; set; }
        [Column("codigo")]
        public string? Codigo { get; set; }
        [Column("nome")]
        public string Nome { get; set; }
        [Column("descricao")]
        public string? Descricao { get; set; }
        [Column("preco")]
        public decimal Preco { get; set; }
        [Column("quantidade")]
        public int Quantidade { get; set; }
        [Column("imagemurl")]

        public string? Status { get; set; } 
         [Column("status")]
        public string? ImagemUrl { get; set; }
        [Column("imagempublicid")]
        public string? ImagemPublicId { get; set; }

        [Column("usuarioid")]
        public int UsuarioId { get; set; }
        public Usuario? Usuario { get; set; }
        public ICollection<JoiaPedido> JoiasPedidos { get; set; } = new List<JoiaPedido>();
    }
}
