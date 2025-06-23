using AurumApi.DTO;
using AurumApi.DTO.Response;
using AurumApi.Models;

namespace AurumApi.Services.Interface
{
    public interface IJoiasService
    {
        Task<IEnumerable<JoiaResponse>> GetJoiasByUsuarioId(int usuarioId);
        Task<JoiaResponse> GetJoiaById(int id);
        Task<IEnumerable<JoiaResponse>> GetJoiaByTerm(int usuarioId, string term);
        Task<JoiaResponse> CreateJoia(JoiaCreateDTO joiaDto, int usuarioId, IFormFile? imagem);
        Task<bool> UpdateJoia(int id, JoiaUpdateDTO joiaDto, IFormFile? imagem);
        Task<bool> DeleteJoia(int id);
    }
}
