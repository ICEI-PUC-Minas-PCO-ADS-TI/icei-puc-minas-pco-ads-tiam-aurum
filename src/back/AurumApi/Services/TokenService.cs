using AurumApi.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AurumApi.Services
{
    public class TokenService
    {
        public string GenerateToken(Usuario user)
        {
            var key = Encoding.ASCII.GetBytes(Configuration.JwtKey);
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.Email)
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            // Configuração do token
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),

                Expires = DateTime.UtcNow.AddHours(8),

                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}
