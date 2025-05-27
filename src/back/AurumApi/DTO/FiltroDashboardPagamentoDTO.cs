using AurumApi.Enum;

namespace AurumApi.DTO
{
    public class FiltroDashboardPagamentoDTO
    {
        public DateTime? MesPagamento { get; set; } = DateTime.Today;
        public string? Status { get; set; }

        public UsuarioDTO? Usuario { get; set; }

        public DateTime? PeriodoPagamentos { get; set; }

        public StatusPagamento? TipoPagamento { get; set; }

    }
}
