using AurumApi.DTO;
using AurumApi.Services;
using AurumApi.Services.Interface;
using Microsoft.AspNetCore.Mvc;

namespace AurumApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PagamentoController : ControllerBase
    {
        private readonly IPagamento _pagamentoService;

        public PagamentoController(IPagamento pagamentoService)
        {
            _pagamentoService = pagamentoService;
        }

        [HttpPost("pagamentosMes")]
        public async Task<IActionResult> GetRelatorioPagamentos([FromBody] FiltroDashboardPagamentoDTO filtro)
        {
            try
            {
                var relatorio = await _pagamentoService.GerarRelatorioPagamentos(filtro);
                return Ok(relatorio);
            }
            catch (ArgumentException e)
            {
                return BadRequest(e.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Erro interno no servidor: " + ex.Message);
            }
        }

        [HttpPost("dashboard")]
        public async Task<IActionResult> GetDashboardPagamentos([FromBody] FiltroDashboardPagamentoDTO filtro)
        {
            try
            {
                var dashboard = await _pagamentoService.GerarDashboard(filtro);
                return Ok(dashboard);
            }
            catch (ArgumentException e)
            {
                return BadRequest(e.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Erro interno no servidor: " + ex.Message);
            }
        }

        [HttpGet("usuario/{usuarioId:int}/pendentes")]
        public async Task<IActionResult> GetPagamentosPendentes(int usuarioId)
        {
            try
            {
                var pagamentosPendentes = await _pagamentoService.ListarPagamentosPendentes(usuarioId);
                if (pagamentosPendentes == null)
                    pagamentosPendentes = new List<PagamentoDTO>();
                return Ok(pagamentosPendentes);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro interno: {ex.Message}");
            }
        }

        [HttpPut("marcar-como-pago/{pagamentoId:int}")]
        public async Task<IActionResult> MarcarComoPago(int pagamentoId)
        {
            try
            {
                var sucesso = await _pagamentoService.MarcarComoPago(pagamentoId);
                if (!sucesso)
                    return StatusCode(500, "Erro ao marcar o pagamento como pago.");
                return Ok("Pagamento marcado como pago com sucesso.");
            }
            catch (InvalidOperationException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro interno: {ex.Message}");
            }
        }
    }
}
