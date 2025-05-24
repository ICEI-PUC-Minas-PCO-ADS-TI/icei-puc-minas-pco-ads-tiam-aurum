using AurumApi.DTO;
using AurumApi.DTO.Response;
using AurumApi.Models;

namespace AurumApi.Services.Interface
{
    public interface IJoiasService
    {
        Task<JoiaResponse> CreateJoiaAsync(JoiaDTO joiaDto, int usuarioId, IFormFile? imagem);
        Task<IEnumerable<JoiaResponse>> GetJoiasByUsuarioId(int usuarioId);
        Task<JoiaResponse> GetJoiaById(int id);
        Task<bool> UpdateJoia(JoiaDTO joiaDto);
        Task<bool> DeleteJoia(int id);
    }
}
