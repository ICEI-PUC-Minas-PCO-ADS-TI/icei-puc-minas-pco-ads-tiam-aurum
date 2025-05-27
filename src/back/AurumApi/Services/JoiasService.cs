using AurumApi.Data;
using AurumApi.DTO;
using AurumApi.DTO.Response;
using AurumApi.Models;
using AurumApi.Services.Interface;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.EntityFrameworkCore;

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
                UrlImagem = joia.ImagemUrl
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
                UrlImagem = j.ImagemUrl
            });
        }

        public async Task<Joia> GetJoiaForUpdate(int id)
        {
            var joia = await _aurumDataContext.Joias
                .FirstOrDefaultAsync(j => j.Id == id);

            return joia;
        }

        public async Task<JoiaResponse> CreateJoia(JoiaCreateDTO joiaDto, int usuarioId, IFormFile? imagem)
        {
            var (urlImagem, publicId) = await UploadImagemAsync(imagem);

            Joia joia = new Joia
            {
                Nome = joiaDto.Nome.Trim(),
                Descricao = joiaDto.Descricao.Trim(),
                Preco = joiaDto.Preco,
                Quantidade = joiaDto.Quantidade,
                ImagemUrl = urlImagem,
                ImagemPublicId = publicId,
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
                UrlImagem = joia.ImagemUrl
            };
        }
        public async Task<bool> UpdateJoia(int id, JoiaUpdateDTO joiaDto, IFormFile? imagem)
        {
            if (id <= 0)
                throw new ArgumentException("Joia inválida.");

            var joia = await GetJoiaForUpdate(id);

            if (joia == null)
                throw new InvalidOperationException($"Joia com ID {id} não encontrada.");

            if (imagem != null)
            {
                if (!string.IsNullOrEmpty(joia.ImagemPublicId))
                {
                    await _cloudinary.DestroyAsync(new DeletionParams(joia.ImagemPublicId));
                }

                var (urlImagem, publicId) = await UploadImagemAsync(imagem);
                joia.ImagemUrl = urlImagem ?? joia.ImagemUrl;
                joia.ImagemPublicId = publicId ?? joia.ImagemPublicId;
            }

            joia.Nome = string.IsNullOrWhiteSpace(joiaDto.Nome) ? joia.Nome : joiaDto.Nome.Trim();
            joia.Descricao = string.IsNullOrWhiteSpace(joiaDto.Descricao) ? joia.Descricao : joiaDto.Descricao.Trim();
            joia.Preco = joiaDto.Preco ?? joia.Preco;
            joia.Quantidade = joiaDto.Quantidade ?? joia.Quantidade;

            return await _aurumDataContext.SaveChangesAsync() > 0;
        }

        public async Task<bool> DeleteJoia(int id)
        {
            if (id <= 0)
                throw new ArgumentException("Joia inválida.");

            var joia = await GetJoiaForUpdate(id);
            if (joia == null)
                throw new InvalidOperationException($"Joia com ID {id} não encontrada.");

            if (!string.IsNullOrEmpty(joia.ImagemPublicId))
            {
                var result = await _cloudinary.DestroyAsync(new DeletionParams(joia.ImagemPublicId));
                if (result.Error != null)
                    throw new Exception($"Erro ao excluir imagem do Cloudinary: {result.Error.Message}");
            }

            _aurumDataContext.Joias.Remove(joia);

            return await _aurumDataContext.SaveChangesAsync() > 0;
        }

        public async Task<(string Url, string PublicId)> UploadImagemAsync(IFormFile imagem)
        {
            if (imagem == null || imagem.Length == 0)
                return (null, null);

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

            return (result.SecureUrl.ToString(), result.PublicId);
        }
    }
}
