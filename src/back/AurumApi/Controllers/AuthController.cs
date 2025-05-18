using AurumApi.Data;
using AurumApi.Models;
using Microsoft.AspNetCore.Mvc;
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
        public IActionResult Login([FromBody] Usuario login)
        {
            
            if (validarUsuario(login))
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

                return Ok(new
                {
                    Token = new JwtSecurityTokenHandler().WriteToken(token)  
                });
            }

            return Unauthorized();
        }

        private bool validarUsuario(Usuario usuario)
        {
            var usuarioValido = _aurumDataContext.Usuarios
                .FirstOrDefault(u => u.Documento == usuario.Documento && u.senha == usuario.senha);
            return usuarioValido != null;   
        }
    }
}
    