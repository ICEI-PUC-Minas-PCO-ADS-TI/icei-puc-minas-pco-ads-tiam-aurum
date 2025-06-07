namespace AurumApi.DTO
{
    public class PedidoCreateDTO
    {
        public string CPFCliente { get; set; }
        public List<ItemCarrinhoDTO> Itens { get; set; }
        public PagamentoCreateDTO Pagamento { get; set; }
    }
}
