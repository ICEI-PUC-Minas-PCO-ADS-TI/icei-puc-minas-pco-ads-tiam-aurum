using System.ComponentModel.DataAnnotations.Schema;

namespace AurumApi.Models
{
    [Table("pedidos")]
    public class Pedido
    {
        [Column("id")]
        public int Id { get; set; }
        [Column("datapedido")]
        public DateTime DataPedido { get; set; }
        [Column("valortotal")]
        public decimal ValorTotal { get; set; }
        [Column("usuarioid")]
        public Usuario? Usuario { get; set; }
        [Column("clienteid")]
        public Cliente? Cliente { get; set; }   
    }
}
