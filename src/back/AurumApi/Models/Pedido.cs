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
        public decimal? ValorTotal { get; set; }
        [Column("usuarioid")]
        public int UsuarioId { get; set; }
        public Usuario? Usuario { get; set; }
        [Column("clienteid")]
        public int ClienteId { get; set; }
        public Cliente? Cliente { get; set; }
        public ICollection<Pagamento> Pagamentos { get; set; } = new List<Pagamento>();
        public ICollection<JoiaPedido> JoiasPedidos { get; set; } = new List<JoiaPedido>();
        [Column("tipo")]
        public int? tipo {get; set;}
        
    }
}
