using System.ComponentModel.DataAnnotations.Schema;
using AurumApi.DTO;

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

        public TarefaDTO toDTO()
        {
            TarefaDTO dto = new TarefaDTO();
            dto.Id = Id;
            dto.Descricao = Descricao;
            dto.DataCriado = DataCriado;
            dto.DataRealizar = DataRealizar;
            dto.UsuarioId = UsuarioId;
            return dto;
        }
    }
}
