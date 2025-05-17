using AurumApi.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace AurumApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class UsuarioController : ControllerBase
    {
        private readonly AurumDataContext _aurumDataContext;

        public UsuarioController(AurumDataContext aurumDataContext)
        {
            _aurumDataContext = aurumDataContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsuarios()
        {
            var usuarios = await _aurumDataContext.Usuarios.ToListAsync();
            return Ok(usuarios);
        }
    }
}
