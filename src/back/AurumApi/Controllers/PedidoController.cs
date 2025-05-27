using AurumApi.DTO;
using AurumApi.DTO.Response;
using AurumApi.Services.Interface;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AurumApi.Controllers
{
    [ApiController]
    public class PedidoController : ControllerBase
    {
        private readonly IPedidoService _service;
        public PedidoController(IPedidoService service)
        {
            _service = service;
        }
        [HttpPost("api/pedido")]
        public async Task<IActionResult> CriarPedido([FromQuery] int usuarioId, [FromBody] PedidoCreateDTO dto)
        {
            try
            {
                var pedido = await _service.CriarPedidoAsync(usuarioId, dto);
                return Created($"/api/pedido/{usuarioId}/{pedido.Id}", pedido);
            }
            catch (ArgumentException ex)
            {
                return StatusCode(400, $"Pedido inválido: {ex.Message} Verifique os dados enviados.");
            }
            catch (InvalidOperationException ex)
            {
                return StatusCode(404, $"Erro ao criar pedido: {ex.Message}");
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, "Erro ao salvar a joia no banco de dados.");

            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro interno no servidor:{ex.Message}");
            }
        }
    }
}
