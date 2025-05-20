namespace AurumApi.DTO
{
    public class FiltroDashboardPagamentoDTO
    {
        public DateTime? MesPagamento { get; set; }
        public string? Status { get; set; }

        public UsuarioDTO? Usuario { get; set; }

    }
}
