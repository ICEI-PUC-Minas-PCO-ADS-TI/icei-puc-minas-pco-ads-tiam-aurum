using System.ComponentModel.DataAnnotations.Schema;

namespace AurumApi.Models
{
    [Table("pagamentos")]
    public class Pagamento
    {
        [Column("id")]
        public int Id { get; set; }
        [Column("qtdparcelas")]
        public int QtdParcelas { get; set; }
        [Column("valorparcela")]
        public decimal ValorParcela { get; set; }
        [Column("datapagamento")]
        public DateTime DataPagamento { get; set; }
        [Column("datavencimento")]
        public DateTime DataVencimento { get; set; }
        [Column("status")]
        public string? Status { get; set; }
        [Column("formapagamento")]
        public string? FormaPagamento { get; set; }
        [Column("usuarioid")]
        public Usuario? Usuario { get; set; }
        [Column("pedidoid")]
        public Pedido? Pedido { get; set; }
        [Column("clienteid")]
        public Cliente? Cliente { get; set; }
        [Column("numeroparcela")]
        public int NumeroParcela { get; set; }
    }
}
