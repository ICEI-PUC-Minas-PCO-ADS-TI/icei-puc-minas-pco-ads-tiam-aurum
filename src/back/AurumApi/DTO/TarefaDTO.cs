using AurumApi.Models;

namespace AurumApi.DTO
{
    public class TarefaDTO
    {
        public int Id { get; set; }
        public string? Descricao { get; set; }
        public int UsuarioId { get; set; }
        public DateTime? DataCriado { get; set; }
        public DateTime? DataRealizar { get; set; }

        public Tarefa toEntity()
        {
            Tarefa entity = new Tarefa();
            entity.Descricao = Descricao;
            entity.DataRealizar = DataRealizar;
            entity.DataCriado = DataCriado;
            entity.UsuarioId = UsuarioId;
            return entity;
        }

    }
}
