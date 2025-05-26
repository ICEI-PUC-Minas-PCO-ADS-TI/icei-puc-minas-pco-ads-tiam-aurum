using AurumApi.Services;
using AurumApi.DTO;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace AurumApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClientesController : ControllerBase
    {
        private readonly IClienteService _clienteService;

        public ClientesController(IClienteService clienteService)
        {
            _clienteService = clienteService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ClienteDTO>>> Get()
        {
            var clientes = await _clienteService.ObterTodos();
            return Ok(clientes);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ClienteDTO>> GetById(int id)
        {
            var cliente = await _clienteService.ObterPorId(id);
            return cliente != null ? Ok(cliente) : NotFound();
        }

        [HttpPost]
        public async Task<ActionResult<ClienteDTO>> Post([FromBody] ClienteDTO clienteDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var novoCliente = await _clienteService.Criar(clienteDTO);
            return CreatedAtAction(nameof(GetById), new { id = novoCliente.Id }, novoCliente);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] ClienteDTO clienteDTO)
        {
            if (id != clienteDTO.Id)
                return BadRequest();

            if (!await _clienteService.Atualizar(id, clienteDTO))
                return NotFound();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (!await _clienteService.VerificarExistencia(id))
                return NotFound();

            await _clienteService.Remover(id);
            return NoContent();
        }
    }
}
