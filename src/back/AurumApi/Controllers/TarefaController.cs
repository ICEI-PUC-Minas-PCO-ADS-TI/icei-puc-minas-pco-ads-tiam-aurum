using AurumApi.DTO;
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

        [HttpPut("ataulizar")]
        public async Task<IActionResult> UpdateTarefa([FromBody] TarefaDTO dto)
        {
            try 
            {
                var tarefaAtualiza = await _tafaService.UpdateTarefa(dto);
                return Ok(tarefaAtualiza);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("cadastro")]
        public async Task<IActionResult> CadastroTarefa([FromBody] TarefaDTO dto)
        {
            try { 
                var newTarefa = await _tafaService.CadastrarTarefa(dto);
                return Ok(newTarefa);
            }catch(Exception ex) 
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCadastro(int id) 
        {
            try 
            {
                var tarefaDelete = await _tafaService.DeleteTarefa(id);
                return Ok(tarefaDelete);
            } catch (Exception e) 
            {
                return BadRequest(e.Message);
            }
        }

    }
}
