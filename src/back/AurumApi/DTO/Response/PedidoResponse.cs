namespace AurumApi.DTO.Response
{
    public class PedidoResponse
    {
        public int Id { get; set; }
        public DateTime DataPedido { get; set; }
        public decimal? ValorTotal { get; set; }
        public int UsuarioId { get; set; }
        public int ClienteId { get; set; }
    }
}
