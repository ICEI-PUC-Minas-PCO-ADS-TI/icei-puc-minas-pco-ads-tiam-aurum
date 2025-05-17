using Aurum.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Aurum.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsuarioController : ControllerBase
    {
       private readonly ApplicationDbContext _context;

       public UsuarioController(ApplicationDbContext context)
       {
             _context = context;
       }

       [HttpGet]
       public async Task<ActionResult<IEnumerable<Usuario>>> GetUsuarios()
       {
           var usuarios = await _context.Usuarios.ToListAsync();
           return Ok(usuarios);
       }
    }
}
