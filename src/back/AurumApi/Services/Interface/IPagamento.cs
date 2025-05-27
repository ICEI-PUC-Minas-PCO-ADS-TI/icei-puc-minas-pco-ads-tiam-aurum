using AurumApi.DTO;
using AurumApi.DTO.Response;
using AurumApi.Enum;
using AurumApi.Models;

namespace AurumApi.Services.Interface
{
    public interface IPagamento
    {
        Task<PagamentoResponse> GerarRelatorioPagamentos(FiltroDashboardPagamentoDTO filtro);
        Task<List<PagamentoResponse>> GerarDashboard(FiltroDashboardPagamentoDTO filtro);
        Task<List<Pagamento>> GetTipoPagamento(FiltroDashboardPagamentoDTO filtro);
    }
}
