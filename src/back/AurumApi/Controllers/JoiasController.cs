using AurumApi.DTO;
using AurumApi.Services.Interface;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AurumApi.Controllers
{
    [ApiController]
    public class JoiasController : ControllerBase
    {
        private readonly IJoiasService _service;
        public JoiasController(IJoiasService service)
        {
            _service = service;
        }

        [HttpGet("api/joia/{idJoia:int}")]
        public async Task<IActionResult> GetByIdAsync(int idJoia)
        {
            try
            {
                var joia = await _service.GetJoiaById(idJoia);

                if (joia == null)
                    return NotFound($"Joia com ID {idJoia} não encontrada.");

                return Ok(joia);
            }
            catch (ArgumentException ex)
            {
                return StatusCode(400, "Joia inválida.");
            }
            catch (InvalidOperationException ex)
            {
                return StatusCode(404, "Joia não encontrada.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro interno no servidor:{ex.Message}");
            }
        }

        [HttpGet("api/joia/usuario/{usuarioId:int}")]
        public async Task<IActionResult> GetAllAsync(int usuarioId)
        {
            try
            {
                var joias = await _service.GetJoiasByUsuarioId(usuarioId);
                return Ok(joias);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro interno no servidor:{ex.Message}");
            }
        }

        [HttpPost("api/joia")]
        public async Task<IActionResult> PostAsync([FromQuery] int usuarioId, [FromForm] JoiaCreateDTO joiaDto, IFormFile? imagem)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var joiaResponse = await _service.CreateJoia(joiaDto, usuarioId, imagem);
                return Created($"/api/joia/{joiaResponse.Id}", joiaResponse);
            }
            catch(DbUpdateException ex)
            {
                return StatusCode(500, "Erro ao salvar a joia no banco de dados.");
                
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro interno no servidor:{ex.Message}");
            }
        }

        [HttpPut("api/joia/{idJoia:int}")]
        public async Task<IActionResult> PutAsync(int idJoia, [FromForm] JoiaUpdateDTO joiaDto, IFormFile? imagem)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                var result = await _service.UpdateJoia(idJoia, joiaDto, imagem);
                if (!result)
                    throw new Exception($"Não foi possível atualizar a joia.");
                return NoContent();
            }
            catch (ArgumentException ex)
            {
                return StatusCode(400, "Joia inválida.");
            }
            catch (InvalidOperationException ex)
            {
                return StatusCode(404, "Joia não encontrada.");
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, "Erro ao atualizar a joia no banco de dados.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro interno no servidor:{ex.Message}");
            }
        }

        [HttpDelete("api/joia/{idJoia:int}")]
        public async Task<IActionResult> DeleteAsync(int idJoia)
        {
            try
            {
                var result = await _service.DeleteJoia(idJoia);
                if (!result)
                    throw new Exception($"Não foi possível deletar a joia.");
                return NoContent();
            }
            catch (ArgumentException ex)
            {
                return StatusCode(400, "Joia inválida.");
            }
            catch (InvalidOperationException ex)
            {
                return StatusCode(404, "Joia não encontrada.");
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, "Erro ao excluir a joia no banco de dados.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro interno no servidor: {ex.Message}");
            }
        }
    }
}
