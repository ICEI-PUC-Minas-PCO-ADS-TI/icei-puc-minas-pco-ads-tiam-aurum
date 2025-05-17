using System.ComponentModel.DataAnnotations.Schema;

namespace AurumApi.Models
{
    [Table("joiaspedidos")]
    public class JoiaPedido
    {
        [Column("id")]
        public int Id { get; set; }  // Chave primária
        [Column("quantidade")]
        public int Quantidade { get; set; }
        [Column("precounidade")]
        public decimal PrecoUnidade { get; set; }
        [Column("subtotal")]
        public decimal Subtotal { get; set; }
        [Column("pedidoid")]
        public Pedido? Pedido { get; set; }
        [Column("joiaid")]
        public Joia? Joia { get; set; }


    }
}
