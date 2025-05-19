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
        public DateTime? DataPagamento { get; set; }
        [Column("datavencimento")]
        public DateTime DataVencimento { get; set; }
        [Column("status")]
        public string? Status { get; set; }
        [Column("formapagamento")]
        public string? FormaPagamento { get; set; }
        [Column("numeroparcela")]
        public int NumeroParcela { get; set; }

        [Column("usuarioid")]
        public int UsuarioId { get; set; }
        public Usuario? Usuario { get; set; }
        [Column("pedidoid")]
        public int PedidoId { get; set; }
        public Pedido? Pedido { get; set; }
        [Column("clienteid")]
        public int ClienteId { get; set; }
        public Cliente? Cliente { get; set; }
    }
}
