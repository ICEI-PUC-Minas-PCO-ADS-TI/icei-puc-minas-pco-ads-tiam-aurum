namespace AurumApi.DTO.Response
{
    public class JoiaResponse
    {
        public int Id { get; set; }
        public string? Codigo { get; set; }
        public string Nome { get; set; }
        public string? Descricao { get; set; }
        public decimal Preco { get; set; }
        public int Quantidade { get; set; }
        public string? UrlImagem { get; set; }
    }
}
