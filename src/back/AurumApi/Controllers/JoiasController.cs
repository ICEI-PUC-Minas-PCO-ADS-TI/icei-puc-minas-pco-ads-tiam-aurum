using AurumApi.DTO;
using AurumApi.DTO.Response;
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

        /// <summary>
        /// Obter uma joia
        /// </summary>
        /// <param name="idJoia">Identificador da joia</param>
        /// <returns>Dados da joia</returns>
        /// <response code="200">Sucesso</response>
        /// <response code="400">Identificador inválido</response>
        /// <response code="404">Joia não encontrada</response>
        /// <response code="500">Falha no servidor</response>
        [HttpGet("api/joia/{idJoia:int}")]
        public async Task<IActionResult> GetByIdAsync(int idJoia)
        {
            try
            {
                var joia = await _service.GetJoiaById(idJoia);

                if (joia == null)
                    return NotFound($"Joia com ID {idJoia} não encontrada.");

                return StatusCode(200, joia);
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

        /// <summary>
        /// Obter todas as joias
        /// </summary>
        /// <param name="usuarioId">Identificador do usuário</param>
        /// <returns>Coleção de joias</returns>
        /// <response code="200">Sucesso</response>
        /// <response code="500">Falha no servidor</response>
        [HttpGet("api/joia/usuario/{usuarioId:int}")]
        public async Task<IActionResult> GetAllAsync(int usuarioId)
        {
            try
            {
                var joias = await _service.GetJoiasByUsuarioId(usuarioId);
                return StatusCode(200, joias);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro interno no servidor:{ex.Message}");
            }
        }

        /// <summary>
        /// Obter joia(s) por termo de pesquisa
        /// </summary>
        /// <param name="usuarioId">Identificador do usuário</param>
        /// <param name="term">Código ou nome da joia</param>
        /// <returns>Coleção de joias ou joia caso pesquisa por código</returns>
        /// <response code="200">Sucesso</response>
        /// <response code="500">Falha no servidor</response>
        [HttpGet("api/joia/usuario/{usuarioId:int}/buscar")]
        public async Task<IActionResult> GetByTermAsync([FromQuery] int usuarioId, [FromQuery] string term)
        {
            try
            {
                var joias = await _service.GetJoiaByTerm(usuarioId, term);
                return StatusCode(200, joias);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro interno no servidor:{ex.Message}");
            }
        }

        /// <summary>
        /// Cadastrar uma joia
        /// </summary>
        /// <param name="joiaDto">Dados da joia</param>
        /// <returns>Joia recém criada</returns>
        /// <response code="201">Sucesso</response>
        /// <response code="400">Joia inválida</response>
        /// <response code="500">Falha no servidor</response>
        [ProducesResponseType(typeof(JoiaResponse), StatusCodes.Status201Created)]
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
            catch (ArgumentException ex)
            {
                return StatusCode(400, "Joia inválida. Verifique os dados informados.");
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
        /// Atualiza uma joia
        /// </summary>
        /// <param name="idJoia">Identificador da joia</param>
        /// <param name="joiaDto">Dados da joia</param>
        /// <returns>No Content</returns>
        /// <response code="204">Sucesso</response>
        /// <response code="400">Joia inválida</response>
        /// <response code="404">Joia não encontrada</response>
        /// <response code="500">Falha no servidor</response>
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [HttpPut("api/joia/{idJoia:int}")]
        public async Task<IActionResult> PutAsync(int idJoia, [FromForm] JoiaUpdateDTO joiaDto, IFormFile? imagem)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                var result = await _service.UpdateJoia(idJoia, joiaDto, imagem);
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

        /// <summary>
        /// Remove uma joia
        /// </summary>
        /// <param name="idJoia">Identificador da joia</param>
        /// <returns>No Content</returns>
        /// <response code="204">Sucesso</response>
        /// <response code="400">Identificador inválido</response>
        /// <response code="404">Joia não encontrada</response>
        /// <response code="500">Falha no servidor</response>
        [ProducesResponseType(StatusCodes.Status204NoContent)]
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
