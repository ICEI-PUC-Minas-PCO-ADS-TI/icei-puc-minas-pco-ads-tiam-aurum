using AurumApi.DTO;
using AurumApi.DTO.Response;

namespace AurumApi.Services.Interface
{
    public interface IPagamento
    {
        Task<PagamentoResponse> GerarRelatorioPagamentos(FiltroDashboardPagamentoDTO filtro);
        Task<List<PagamentoResponse>> GerarDashboard(FiltroDashboardPagamentoDTO filtro);
    }
}
