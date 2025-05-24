using AurumApi.Data;
using AurumApi.DTO;
using AurumApi.DTO.Response;
using AurumApi.Models;
using AurumApi.Services.Interface;
using Microsoft.EntityFrameworkCore;

namespace AurumApi.Services
{
    public class PagamentoService : IPagamento
    {
        private readonly AurumDataContext _aurumDataContext;

        public PagamentoService(AurumDataContext aurumDataContext)
        {
            this._aurumDataContext = aurumDataContext;
        }

        public async Task<List<PagamentoResponse>> GerarDashboard(FiltroDashboardPagamentoDTO filtro)
        {
            if (filtro == null) throw new ArgumentNullException(nameof(filtro));
            if (!filtro.MesPagamento.HasValue) throw new ArgumentException("MesPagamento não pode ser nulo.", nameof(filtro.MesPagamento));

            DateTime dataInicial = filtro.MesPagamento.Value.AddMonths(-6);

            List<Pagamento> listPagamentos = await _aurumDataContext.Pagamentos
                .Where(p => p.DataPagamento >= dataInicial && p.Status == filtro.Status && p.UsuarioId == filtro.Usuario.id)
                .ToListAsync();

            return MontarDashboard(listPagamentos);
        }

        public async Task<PagamentoResponse> GerarRelatorioPagamentos(FiltroDashboardPagamentoDTO filtro) // Corrigido o retorno para Task<PagamentoResponse>
        {
            if (filtro == null) throw new ArgumentNullException(nameof(filtro));

            List<Pagamento> listPagamentos = await _aurumDataContext.Pagamentos
                .Where(p => p.DataPagamento >= filtro.MesPagamento && p.Status == filtro.Status && p.UsuarioId == filtro.Usuario.id)
                .ToListAsync(); 

            if (!listPagamentos.Any())
            {
                throw new ArgumentException("Nenhum pagamento encontrado com os critérios fornecidos.");
            }

            return MontarRelatorioPagamentos(listPagamentos);


        }

        private PagamentoResponse MontarRelatorioPagamentos(List<Pagamento> listPagamentos)
        {
            PagamentoResponse pagamentoResponse = new PagamentoResponse();
            pagamentoResponse.ValorTotal = 0;

            for (int i = 0;  i < listPagamentos.Count; i++)
            {
                pagamentoResponse.ValorTotal+= listPagamentos[i].ValorPagamento;
            }
            return pagamentoResponse;
        }

        private List<PagamentoResponse> MontarDashboard(List<Pagamento> listPagamentos)
        {
            var listaPagamentos = listPagamentos
                .GroupBy(p => new { p.DataPagamento.Value.Year, p.DataPagamento.Value.Month, p.Status }) // agrupando por ano/mês e status (se quiser)
                .Select(g => new PagamentoResponse
                {
                    MesPagamento = new DateTime(g.Key.Year, g.Key.Month, 1), // você pode ajustar esse campo conforme quiser
                    Status = g.Key.Status,
                    ValorTotal = g.Sum(p => p.ValorPagamento),
                    quantidadePagamentos = g.Count()
                })
                .OrderBy(r => r.MesPagamento) // ordena cronologicamente
                .ToList();

            return listaPagamentos;
        }



    }
}
