using AurumApi.DTO;
using AurumApi.Models;

namespace AurumApi.Services.Interface
{
    public interface IJoiasService
    {
        Task<Joia> CreateJoiaAsync(JoiaDTO joiaDto, int usuarioId, IFormFile? imagem);
        Task<List<JoiaDTO>> GetJoiasByUsuarioId(int usuarioId);
        Task<JoiaDTO> GetJoiaById(int id);
        Task<bool> UpdateJoia(JoiaDTO joiaDto);
        Task<bool> DeleteJoia(int id);
    }
}
