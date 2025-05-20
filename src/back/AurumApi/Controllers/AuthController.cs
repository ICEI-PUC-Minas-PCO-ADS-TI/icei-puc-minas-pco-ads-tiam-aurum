using AurumApi.Data;
using AurumApi.DTO;
using AurumApi.DTO.Response;
using AurumApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AurumApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly string _jwtKey = Configuration.JwtKey;

        private readonly AurumDataContext _aurumDataContext;

        public AuthController(AurumDataContext aurumDataContext)
        {
            _aurumDataContext = aurumDataContext;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UsuarioDTO login)
        {
            UsuarioDTO usuario = await ValidarCredenciaisAsync(login?.Documento, login?.Senha);
            if (usuario != null)
            {
                var claims = new[]
                {
                    new Claim(ClaimTypes.Name, login.Documento),
                    new Claim(ClaimTypes.Role, "Admin")
                };

                var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_jwtKey));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(
                    issuer: "your-app",
                    audience: "your-audience",
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(30),
                    signingCredentials: creds
                );

                return Ok(new LoginResponse
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    usuario = usuario,
                    mensagem = "Login realizado com sucesso"
                });
            }

            return Unauthorized();
        }

        private async Task<UsuarioDTO> ValidarCredenciaisAsync(string documento, string senha)
        {
            if (string.IsNullOrWhiteSpace(documento) || string.IsNullOrWhiteSpace(senha))
                return null;

            var usuario = await _aurumDataContext.Usuarios
                .FirstOrDefaultAsync(u => u.Documento == documento && u.Senha == senha);

            return usuario?.toDTO();
        }
     }
}
    