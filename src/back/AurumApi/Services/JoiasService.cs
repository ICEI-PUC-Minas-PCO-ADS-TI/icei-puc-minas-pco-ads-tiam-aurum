using AurumApi.Data;
using AurumApi.DTO;
using AurumApi.Models;
using AurumApi.Services.Interface;
using CloudinaryDotNet.Actions;
using CloudinaryDotNet;
using Microsoft.EntityFrameworkCore;
using AurumApi.DTO.Response;

namespace AurumApi.Services
{
    public class JoiasService : IJoiasService
    {
        private readonly AurumDataContext _aurumDataContext;
        private readonly Cloudinary _cloudinary;
        public JoiasService(AurumDataContext aurumDataContext, Cloudinary cloudinary)
        {
            _aurumDataContext = aurumDataContext;
            _cloudinary = cloudinary ?? throw new ArgumentNullException(nameof(cloudinary)); ;
        }

        public async Task<JoiaResponse> GetJoiaById(int id)
        {
            var joia = await _aurumDataContext.Joias
                .AsNoTracking()
                .FirstOrDefaultAsync(j => j.Id == id);

            if (joia == null)
                return null;

            return new JoiaResponse
            {
                Id = joia.Id,
                Nome = joia.Nome,
                Descricao = joia.Descricao,
                Preco = joia.Preco,
                Quantidade = joia.Quantidade,
                UrlImagem = joia.Imagem
            };
        }

        public async Task<IEnumerable<JoiaResponse>> GetJoiasByUsuarioId(int usuarioId)
        {
            var joias = await _aurumDataContext.Joias
                .AsNoTracking()
                .Where(j => j.UsuarioId == usuarioId)
                .OrderBy(j => j.Nome)
                .ToListAsync();

            return joias.Select(j => new JoiaResponse
            {
                Id = j.Id,
                Nome = j.Nome,
                Descricao = j.Descricao,
                Preco = j.Preco,
                Quantidade = j.Quantidade,
                UrlImagem = j.Imagem
            });
        }

        public async Task<JoiaResponse> CreateJoiaAsync(JoiaDTO joiaDto, int usuarioId, IFormFile? imagem)
        {
            string? urlImagem = await UploadImagemAsync(imagem);

            Joia joia = new Joia
            {
                Nome = joiaDto.Nome.Trim(),
                Descricao = joiaDto.Descricao.Trim(),
                Preco = joiaDto.Preco,
                Quantidade = joiaDto.Quantidade,
                Imagem = urlImagem,
                UsuarioId = usuarioId
            };

            await _aurumDataContext.Joias.AddAsync(joia);
            await _aurumDataContext.SaveChangesAsync();

            return new JoiaResponse
            {
                Id = joia.Id,
                Nome = joia.Nome,
                Descricao = joia.Descricao,
                Preco = joia.Preco,
                Quantidade = joia.Quantidade,
                UrlImagem = joia.Imagem
            };
        }
        public Task<bool> UpdateJoia(JoiaDTO joiaDto)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteJoia(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<string> UploadImagemAsync(IFormFile imagem)
        {
            if (imagem == null || imagem.Length == 0)
                return null;

            using var stream = imagem.OpenReadStream();
            var uploadParams = new ImageUploadParams
            {
                File = new FileDescription(imagem.FileName, stream),
                Folder = "joias"
            };

            var result = await _cloudinary.UploadAsync(uploadParams);
            if (result == null || result.SecureUrl == null)
            {
                var errorMessage = result?.Error?.Message ?? "Erro desconhecido ao enviar imagem.";
                throw new Exception($"Falha ao enviar imagem para o Cloudinary: {errorMessage}");
            }

            return result.SecureUrl.ToString();
        }
    }
}
