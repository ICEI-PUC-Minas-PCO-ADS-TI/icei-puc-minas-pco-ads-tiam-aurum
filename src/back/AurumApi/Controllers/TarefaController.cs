using AurumApi.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AurumApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class TarefaController : ControllerBase
    {

        private readonly ITarefaService _tafaService; 
        
        public  TarefaController (ITarefaService tafaService)
        {
            _tafaService = tafaService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTarefaByUsuario(int id)
        {
            try
            {
                var tarefas = await _tafaService.GetTarefaByUsuario(id);
                return Ok(tarefas);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


    }
}
