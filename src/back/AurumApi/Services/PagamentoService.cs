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

        public async Task<PagamentoResponse> GerarRelatorioPagamentos(FiltroDashboardPagamentoDTO filtro) // Corrigido o retorno para Task<PagamentoResponse>
        {
            if (filtro == null) throw new ArgumentNullException(nameof(filtro));

            List<Pagamento> listPagamentos = await _aurumDataContext.Pagamentos
                .Where(p => p.DataPagamento >= filtro.MesPagamento && p.Status == filtro.Status)
                .ToListAsync(); 

            if (!listPagamentos.Any())
            {
                throw new ArgumentException("Nenhum pagamento encontrado com os critérios fornecidos.");
            }

            return montarRelatorioPagamentos(listPagamentos);


        }

        private PagamentoResponse montarRelatorioPagamentos(List<Pagamento> listPagamentos)
        {
            PagamentoResponse pagamentoResponse = new PagamentoResponse();
            pagamentoResponse.ValorTotal = 0;

            for (int i = 0;  i < listPagamentos.Count; i++)
            {
                pagamentoResponse.ValorTotal+= listPagamentos[i].ValorPagamento;
            }
            return pagamentoResponse;
        }
    }
}
