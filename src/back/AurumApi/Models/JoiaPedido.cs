using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

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
        [Column("nomejoia")]
        public string NomeJoia { get; set; }
        [Column("descricaojoia")]
        public string DescricaoJoia { get; set; }
        [Column("imagemurljoia")]
        public string ImagemUrlJoia { get; set; }
        [Column("pedidoid")]
        public int PedidoId { get; set; }
        [JsonIgnore]
        public Pedido? Pedido { get; set; }
        [Column("joiaid")]
        public int? JoiaId { get; set; }
        public Joia? Joia { get; set; }
    }
}
