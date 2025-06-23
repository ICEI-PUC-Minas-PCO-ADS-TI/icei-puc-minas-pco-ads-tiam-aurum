namespace AurumApi.DTO.Response
{
    public class PedidoResponse
    {
        public int Id { get; set; }
        public DateTime DataPedido { get; set; }
        public decimal? ValorTotal { get; set; }
        public int UsuarioId { get; set; }
        public int ClienteId { get; set; }

        public List<PagamentoResponseDTO>? Pagamentos { get; set; }
    }

    public class PagamentoResponseDTO
    {
        public int Id { get; set; }
        public int QtdParcelas { get; set; }
        public decimal ValorParcela { get; set; }
        public DateTime? DataPagamento { get; set; }
        public DateTime DataVencimento { get; set; }
        public string? Status { get; set; }
        public string? FormaPagamento { get; set; }
        public int NumeroParcela { get; set; }
        public decimal ValorPagamento { get; set; }
    }
}
