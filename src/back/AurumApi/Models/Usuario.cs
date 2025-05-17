using System.ComponentModel.DataAnnotations.Schema;

namespace AurumApi.Models
{
    [Table("usuarios")]
    public class Usuario
    {
        public string Email { get; set; }
    }
}
