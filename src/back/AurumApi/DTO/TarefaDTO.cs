namespace AurumApi.DTO
{
    public class TarefaDTO
    {
        public int Id { get; set; }
        public string? Descricao { get; set; }
        public int UsuarioId { get; set; }
        public DateTime? DataCriado { get; set; }
        public DateTime? DataRealizar { get; set; }

    }
}
