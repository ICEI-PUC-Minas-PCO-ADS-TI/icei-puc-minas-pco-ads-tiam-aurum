using AurumApi.DTO;
using AurumApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace AurumApi.Services.Interface
{
    public interface ITarefaService
    {
        Task<List<TarefaDTO>> GetTarefaByUsuario(int id);
        Task<ActionResult> UpdateTarefa(TarefaDTO dto);
    }
}
