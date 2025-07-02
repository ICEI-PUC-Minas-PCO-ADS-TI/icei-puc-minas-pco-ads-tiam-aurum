namespace AurumApi.DTO
{
    public class PagamentoDTO
    {
        public int Id { get; set; }
        public int QuantidadeParcelas { get; set; }
        public decimal ValorParcela { get; set; }
        public DateTime DataPagamento { get; set; }

        public DateTime DataVencimento { get; set; }
        public string? Status { get; set; }
        public string? FormaPagamento { get; set; }
        public int NumeroParcela { get; set; }
        public UsuarioDTO? Usuario { get; set; }
        public PedidoDTO? Pedido { get; set; }
        public ClienteDTO? Cliente { get; set; }
        public Decimal ValorPagamento { get; set; }
        public string? NomeCliente { get; set; }
    }
}
