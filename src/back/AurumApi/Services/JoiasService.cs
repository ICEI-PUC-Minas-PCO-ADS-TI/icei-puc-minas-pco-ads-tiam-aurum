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
            if (id <= 0)
                throw new ArgumentException("Joia inválida.");

            var joia = await _aurumDataContext.Joias
                .AsNoTracking()
                .FirstOrDefaultAsync(j => j.Id == id);

            if (joia == null)
                throw new InvalidOperationException($"Joia com ID {id} não encontrada.");

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

        public async Task<Joia> GetJoiaForUpdate(int id)
        {
            var joia = await _aurumDataContext.Joias
                .FirstOrDefaultAsync(j => j.Id == id);

            return joia;
        }

        public async Task<JoiaResponse> CreateJoiaAsync(JoiaCreateDTO joiaDto, int usuarioId, IFormFile? imagem)
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
        public async Task<bool> UpdateJoia(int id, JoiaUpdateDTO joiaDto, IFormFile? imagem)
        {
            if (id <= 0)
                throw new ArgumentException("Joia inválida.");

            var joia = await GetJoiaForUpdate(id);

            if (joia == null)
                throw new InvalidOperationException($"Joia com ID {id} não encontrada.");

            string? urlImagem = await UploadImagemAsync(imagem);

            joia.Nome = string.IsNullOrWhiteSpace(joiaDto.Nome) ? joia.Nome : joiaDto.Nome.Trim();
            joia.Descricao = string.IsNullOrWhiteSpace(joiaDto.Descricao) ? joia.Descricao : joiaDto.Descricao.Trim();
            joia.Preco = joiaDto.Preco ?? joia.Preco;
            joia.Quantidade = joiaDto.Quantidade ?? joia.Quantidade;
            joia.Imagem = urlImagem ?? joia.Imagem;

            await _aurumDataContext.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteJoia(int id)
        {
            if (id <= 0)
                throw new ArgumentException("Joia inválida.");

            var joia = await GetJoiaForUpdate(id);
            if (joia == null)
                throw new InvalidOperationException($"Joia com ID {id} não encontrada.");

            _aurumDataContext.Joias.Remove(joia);
            if (joia.Imagem != null)
            {
                var deleteParams = new DeletionParams(joia.Imagem);
                var result = await _cloudinary.DestroyAsync(deleteParams);
                if (result.Error != null)
                    throw new Exception($"Erro ao excluir imagem do Cloudinary: {result.Error.Message}");
            }
            await _aurumDataContext.SaveChangesAsync();
            return true;
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
