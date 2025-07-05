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
                int mes = filtro.MesPagamento.Value.Month;
                string nomeMes = filtro.MesPagamento.Value.ToString("MMMM", new System.Globalization.CultureInfo("pt-BR"));
                throw new ArgumentException($"Nenhum pagamento encontrado, pela data: {nomeMes}");
            }

            return MontarRelatorioPagamentos(listPagamentos);


        }

        private PagamentoResponse MontarRelatorioPagamentos(List<Pagamento> listPagamentos)
        {
            // Agrupa por PedidoId para garantir unicidade
            var pagamentosPorPedido = listPagamentos
                .GroupBy(p => p.PedidoId)
                .Select(g => g.First()) // pega apenas um pagamento por pedido
                .ToList();

            var pagamentoResponse = new PagamentoResponse
            {
                ValorTotal = pagamentosPorPedido.Sum(p => p.ValorPagamento),
                quantidadePagamentos = pagamentosPorPedido.Count,
                Status = pagamentosPorPedido.FirstOrDefault()?.Status
            };

            return pagamentoResponse;
        }

        private List<PagamentoResponse> MontarDashboard(List<Pagamento> listPagamentos)
        {
            var listaPagamentos = listPagamentos
                .GroupBy(p => new { p.DataPagamento.Value.Year, p.DataPagamento.Value.Month, p.Status }) // agrupando por ano/mês e status (se quiser)
                .Select(g => 
                {
                    var pagamentosUnicos = g.DistinctBy(p => p.PedidoId);

                    return new PagamentoResponse
                    {
                        MesPagamento = new DateTime(g.Key.Year, g.Key.Month, 1), // você pode ajustar esse campo conforme quiser
                        Status = g.Key.Status,
                        ValorTotal = pagamentosUnicos.Sum(p => p.ValorPagamento),
                        quantidadePagamentos = pagamentosUnicos.Count()
                    };
                })
                .OrderBy(r => r.MesPagamento) // ordena cronologicamente
                .ToList();

            return listaPagamentos;
        }

        public async Task<List<PagamentoDTO>> ListarPagamentosPendentes(int usuarioId)
        {
            List<PagamentoDTO> pagamentosPendentes = new List<PagamentoDTO>();
            pagamentosPendentes = await _aurumDataContext.Pagamentos
                .Where(p => p.Status == "Pendente" && p.UsuarioId == usuarioId)
                .Include(p => p.Cliente)
                .Select(p => new PagamentoDTO
                {
                    Id = p.Id,
                    ValorParcela = p.ValorParcela,
                    Status = p.Status,
                    DataVencimento = p.DataVencimento,
                    FormaPagamento = p.FormaPagamento,
                    NumeroParcela = p.NumeroParcela,
                    NomeCliente = p.Cliente.Nome
                })
                .ToListAsync();

            return pagamentosPendentes;
        }

        public async Task<bool> MarcarComoPago(int pagamentoId)
        {
            var pagamento = await _aurumDataContext.Pagamentos.FirstOrDefaultAsync(p => p.Id == pagamentoId);

            if (pagamento == null)
                throw new InvalidOperationException($"Pagamento com ID {pagamentoId} não encontrado.");

            if (pagamento.Status == "Pago")
                return true;

            pagamento.Status = "Pago";
            pagamento.DataPagamento = DateTime.UtcNow;

            if (pagamento.DataVencimento.Kind == DateTimeKind.Unspecified)
                pagamento.DataVencimento = DateTime.SpecifyKind(pagamento.DataVencimento, DateTimeKind.Utc);

            _aurumDataContext.Pagamentos.Update(pagamento);
            await _aurumDataContext.SaveChangesAsync();

            return true;
        }
    }   
}
