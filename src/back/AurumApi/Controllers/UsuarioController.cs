using AurumApi.DTO;
using AurumApi.Services.Interface;
using Microsoft.AspNetCore.Mvc;


namespace AurumApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class UsuarioController : ControllerBase
    {
        private readonly IUsuarioService _usuarioService;

        public UsuarioController(IUsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsuarios()
        {
            var usuarios = await _usuarioService.GetUsuarios();
            return Ok(usuarios);
        }

        [HttpPost("cadastrar")]
        public async Task<IActionResult> CadastrarUsuario([FromBody] UsuarioDTO usuarioDTO)
        {
            try {
                var usuario = await _usuarioService.CadastrarUsuarioAsync(usuarioDTO);
                return CreatedAtAction(nameof(CadastrarUsuario), new { id = usuario.Id }, usuario);
            }
            catch(ArgumentException e)
            {
                return BadRequest(e.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Erro interno no servidor: " + ex.Message);

            }
        }

        [HttpPut("atualizar")]
        public async Task<IActionResult> AtualizarUsuario([FromBody] UsuarioDTO usuarioDTO)
        {
            try
            {
                var response = await _usuarioService.AtualizarAsync(usuarioDTO);
                return Ok(response);
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

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUsuarioById(int id)
        {
            try
            {
                var usuario = await _usuarioService.GetUsuarioByIdAsync(id);
                return Ok(usuario);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Erro interno no servidor: " + ex.Message);
            }
        }
        [HttpPost("buscar")]
        public async Task<IActionResult> BuscarUsuario(string nome)
        {
            try
            {
                var usuario = await _usuarioService.GetUsuarioByNomeAsync(nome);
                return Ok(usuario);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Erro interno no servidor: " + ex.Message);
            }
        }
    }
}
