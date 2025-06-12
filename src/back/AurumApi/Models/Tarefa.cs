using System.ComponentModel.DataAnnotations.Schema;

namespace AurumApi.Models
{
    [Table("tarefa")]
    public class Tarefa
    {
        [Column("id")]
        public int Id { get; set; }

        [Column("descricao")]
        public string? Descricao { get; set; }

        [Column("data_criado")]
        public DateTime? DataCriado { get; set; }

        [Column("usuario_id")]
        public int UsuarioId { get; set; }

        public Usuario? Usuario { get; set; }
        [Column("data_a_realizar")]
        public DateTime? DataRealizar { get; set; }
    }
}
