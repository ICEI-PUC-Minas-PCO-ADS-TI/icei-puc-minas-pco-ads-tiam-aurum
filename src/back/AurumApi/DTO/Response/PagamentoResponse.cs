namespace AurumApi.DTO.Response
{
    public class PagamentoResponse
    {
        public decimal ValorTotal { get; set; }
        public DateTime? MesPagamento { get; set; } =  DateTime.Today;
        public string? Status { get; set; }
        public long quantidadePagamentos { get; set; } = 0;

    }
}
