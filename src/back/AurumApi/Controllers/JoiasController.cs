using AurumApi.DTO;
using AurumApi.DTO.Response;
using AurumApi.Models;
using AurumApi.Services;
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
        [HttpPost("api/joia/{usuarioId}/")]
        public async Task<IActionResult> PostAsync(int usuarioId, [FromForm] JoiaDTO joiaDto, IFormFile? imagem)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var joia = await _service.CreateJoiaAsync(joiaDto, usuarioId, imagem);
                var response = new JoiaResponse
                {
                    Id = joia.Id,
                    Nome = joia.Nome,
                    Descricao = joia.Descricao,
                    Preco = joia.Preco,
                    Quantidade = joia.Quantidade,
                    UrlImagem = joia.Imagem
                };
                return Created($"/api/joia/{usuarioId}", response);
            }
            catch(DbUpdateException ex)
            {
                return StatusCode(500, "Erro ao salvar a joia no banco de dados.");
                
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Erro interno no servidor.");
            }
        }
    }
}
