namespace AurumApi.DTO
{
    public class PedidoCreateDTO
    {
        public int ClienteId { get; set; }
        public List<ItemCarrinhoDTO> Itens { get; set; }
    }
}
