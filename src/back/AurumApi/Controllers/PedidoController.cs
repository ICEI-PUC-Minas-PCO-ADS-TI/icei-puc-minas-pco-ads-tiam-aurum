using AurumApi.DTO;
using AurumApi.Models;
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

        [HttpGet("api/pedido/usuario/{usuarioId:int}")]
        public async Task<IActionResult> GetAllAsync(int usuarioId)
        {
            try
            {
                var pedidos = await _service.GetPedidosByUsuarioId(usuarioId);
                return StatusCode(200, pedidos);
            }
            catch (InvalidOperationException ex)
            {
                return StatusCode(404, $"Usuário com ID {usuarioId} não existe, ou não possui pedidos.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro interno no servidor:{ex.Message}");
            }
        }

        [HttpGet("api/pedido/cliente/{clienteId:int}")]
        public async Task<IActionResult> GetPedidosByClientAsync(int clienteId)
        {
            try
            {
                var pedidos = await _service.GetPedidosByClienteId(clienteId);
                return StatusCode(200, pedidos);
            }
            catch (InvalidOperationException ex)
            {
                return StatusCode(404, $"Cliente com ID {clienteId} não existe, ou não possui pedidos.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro interno no servidor:{ex.Message}");
            }
        }

        [HttpGet("api/pedido/{pedidoId:int}")]
        public async Task<IActionResult> GetByIdAsync(int pedidoId)
        {
            try
            {
                var joia = await _service.GetPedidoById(pedidoId);

                if (joia == null)
                    return NotFound($"Pedido com ID {pedidoId} não encontrado.");

                return Ok(joia);
            }
            catch (ArgumentException ex)
            {
                return StatusCode(400, "Pedido inválido.");
            }
            catch (InvalidOperationException ex)
            {
                return StatusCode(404, "Pedido não encontrado.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro interno no servidor:{ex.Message}");
            }
        }

        [HttpPost("api/pedido")]
        public async Task<IActionResult> PostAsync([FromQuery] int usuarioId, [FromBody] PedidoCreateDTO dto)
        {
            try
            {
                var pedido = await _service.CreatePedidoAsync(usuarioId, dto);
                return Created($"/api/pedido/{pedido.Id}", pedido);
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
