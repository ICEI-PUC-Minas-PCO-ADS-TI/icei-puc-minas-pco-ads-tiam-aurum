using System.ComponentModel.DataAnnotations;

namespace AurumApi.DTO
{
    public class JoiaUpdateDTO
    {
        [StringLength(100, ErrorMessage = "O nome deve ter no máximo 100 caracteres.")]
        public string? Nome { get; set; }
        [StringLength(500, ErrorMessage = "A descrição deve ter no máximo 500 caracteres.")]
        public string? Descricao { get; set; }
        [Range(0.01, double.MaxValue, ErrorMessage = "O preço deve ser maior que 0.01")]
        public decimal? Preco { get; set; }
        [Range(1, int.MaxValue, ErrorMessage = "A quantidade deve ser pelo menos 1.")]
        public int? Quantidade { get; set; }
    }
}
