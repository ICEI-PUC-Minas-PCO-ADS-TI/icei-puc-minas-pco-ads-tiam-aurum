namespace AurumApi.DTO
{
    public class PagamentoCreateDTO
    {
        public int QtdParcelas { get; set; }
        public DateTime DataPrimeiroVencimento { get; set; }
        public string FormaPagamento { get; set; }
    }
}
