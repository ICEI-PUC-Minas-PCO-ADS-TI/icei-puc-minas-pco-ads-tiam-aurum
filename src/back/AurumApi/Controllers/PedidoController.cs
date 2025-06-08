using AurumApi.DTO;
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

        /// <summary>
        /// Obter todas os pedidos de um usuário
        /// </summary>
        /// <param name="usuarioId">Identificador do usuário</param>
        /// <returns>Coleção de pedidos</returns>
        /// <response code="200">Sucesso</response>
        /// <response code="404">Não encontrado</response>
        /// <response code="500">Falha no servidor</response>
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

        /// <summary>
        /// Obter todos os pedidos de um cliente específico
        /// </summary>
        /// <param name="clienteId">Identificador do cliente</param>
        /// <returns>Coleção de pedidos</returns>
        /// <response code="200">Sucesso</response>
        /// <response code="404">Não encontrado</response>
        /// <response code="500">Falha no servidor</response>
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

        /// <summary>
        /// Obter um pedido específico por ID
        /// </summary>
        /// <param name="pedidoId">Identificador do pedido</param>
        /// <returns>Dados do pedido</returns>
        /// <response code="200">Sucesso</response>
        /// <response code="400">Identificador inválido</response>
        /// <response code="404">Pedido não encontrado</response>
        /// <response code="500">Falha no servidor</response>
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

        /// <summary>
        /// Cadastrar um pedido.
        /// </summary>
        /// <param name="usuarioId">Identificador do usuário</param>
        /// <param name="dto">Dados do pedido</param>
        /// <returns>Pedido recém criado</returns>
        /// <response code="201">Sucesso</response>
        /// <response code="400">Pedido inválido</response>
        /// <response code="404">Joia não encontrada</response>
        /// <response code="500">Falha no servidor</response>
        [ProducesResponseType(StatusCodes.Status201Created)]
        [HttpPost("api/pedido")]
        public async Task<IActionResult> PostAsync([FromQuery] int usuarioId, [FromBody] PedidoCreateDTO dto)
        {
            try
            {
                var pedido = await _service.CreatePedido(usuarioId, dto);
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

        /// <summary>
        /// Remove um pedido
        /// </summary>
        /// <param name="id">Identificador do pedido</param>
        /// <returns>No Content</returns>
        /// <response code="204">Sucesso</response>
        /// <response code="400">Identificador inválido</response>
        /// <response code="404">Pedido não encontrado</response>
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [HttpDelete("api/pedido/{id:int}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            try
            {
                var result = await _service.DeletePedido(id);
                if (!result)
                    throw new Exception($"Não foi possível deletar o pedido");
                return NoContent();
            }
            catch (ArgumentException ex)
            {
                return StatusCode(400, $"Não foi possível deletar o pedido. {ex.Message}");
            }
            catch (InvalidOperationException ex)
            {
                return StatusCode(404, $"Pedido com ID {id} não encontrado.");
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, "Erro ao excluir a pedido no banco de dados.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro interno no servidor: {ex.Message}");
            }
        }
        /// <summary>
        /// registrar devolução ou troca de uma peça
        /// </summary>
        /// <param name="joiaId">id da peça</param>
        /// <param name="tipo">tipo: devolucao ou troca</param>
        /// <returns>status da operação</returns>
        [HttpPut("api/pedido/registro-status-peca")]

        /// <summary>
        /// registrar devolução ou troca de uma peça
        /// </summary>
        /// <param name="joiaId">id da peça</param>
        /// <param name="tipo">2 = devolução, 3 = troca</param>
        /// <returns>status da operação</returns>
        [HttpPut("api/pedido/registro-status-peca")]
public async Task<IActionResult> RegistrarStatusPecaAsync([FromQuery] int joiaId, [FromQuery] int tipo)
{
    try
    {
        var resultado = await _service.RegistrarDevolucaoOuTroca(joiaId, tipo);
        if (!resultado)
            return StatusCode(500, "Não foi possível atualizar o status da joia.");
        return Ok("Status da joia atualizado com sucesso.");
    }
    catch (ArgumentException ex)
    {
        return BadRequest(ex.Message);
    }
    catch (InvalidOperationException ex)
    {
        return NotFound(ex.Message);
    }
    catch (Exception ex)
    {
        return StatusCode(500, $"Erro interno no servidor: {ex.Message}");
    }
}


    }
}
