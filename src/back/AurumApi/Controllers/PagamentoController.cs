using AurumApi.DTO;
using AurumApi.Enum;
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

        [HttpGet("pagamentos/{tipoPagamento:StatusPagamento}")]
        public async Task<IActionResult> GetTipoPagamento(FiltroDashboardPagamentoDTO filtro)
        {
            try
            {
                var pagamentos = await _pagamentoService.GetTipoPagamento(filtro);
                return Ok(pagamentos);
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

    }
}
