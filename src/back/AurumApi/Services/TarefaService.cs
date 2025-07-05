using AurumApi.Data;
using AurumApi.DTO;
using AurumApi.Models;
using AurumApi.Services.Interface;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AurumApi.Services
{
    public class TarefaService : ITarefaService
    {
        private readonly AurumDataContext _aurumDataContext;
        public TarefaService(AurumDataContext aurumDataContext) 
        {
            _aurumDataContext = aurumDataContext;
        }

        public async Task<Tarefa> CadastrarTarefa(TarefaDTO dto)
        {
            if (dto == null)
                throw new ArgumentException("Tarefa inválido.");

            if (dto.UsuarioId == 0)
                throw new InvalidDataException("Tarefa sem usuario, não da pra cadastrar sem usuario");


            var tarefa = dto.toEntity();
            _aurumDataContext.Tarefa.Add(tarefa);
            await _aurumDataContext.SaveChangesAsync();

            return tarefa;
        }

        public async Task<ActionResult> DeleteTarefa(int id)
        {
            var existTarefa = await _aurumDataContext.Tarefa
                .FirstOrDefaultAsync(t => t.Id == id);

            if (existTarefa == null)
            {
                return new NotFoundResult();
            }

            _aurumDataContext.Tarefa.Remove(existTarefa);
            await _aurumDataContext.SaveChangesAsync();

            return new NoContentResult();
        }

        public async Task<List<TarefaDTO>> GetTarefaByUsuario(int usuarioId)
        {
            var tarefas = await _aurumDataContext.Tarefa
                .Where(t => t.UsuarioId == usuarioId)
                .OrderBy(t => t.DataRealizar)
                .ToListAsync();
            if(tarefas.Count == 0)
            {
                return new List<TarefaDTO>();
            }

            return tarefas.Select(t => t.toDTO()).ToList();

          
        }

        public async  Task<ActionResult> UpdateTarefa(TarefaDTO dto)
        {
            var existTarefa = _aurumDataContext.Tarefa
                 .FirstOrDefault(t => t.Id == dto.Id);
            if (existTarefa == null) {
                return new NotFoundResult();
            }

            existTarefa.Descricao = dto.Descricao;
            existTarefa.DataRealizar = dto.DataRealizar;

            await _aurumDataContext.SaveChangesAsync();

            return new OkObjectResult(existTarefa.toDTO());
        }
    }
}
