using AurumApi.Models;
using AurumApi.Validation;
using System.ComponentModel.DataAnnotations;

namespace AurumApi.DTO
{
    public class ClienteDTO
    {
        public int Id { get; set; }

        //Dados Pessoais 
        [Required(ErrorMessage = "Nome é obrigatório")]
        [StringLength(100, ErrorMessage = "Nome não pode exceder 100 caracteres")]
        public string Nome { get; set; }

        [Required(ErrorMessage = "Documento é obrigatório")]
        [StringLength(20, ErrorMessage = "Documento não pode exceder 20 caracteres")]
        [CpfValidation]
        public string Documento { get; set; }

        [StringLength(20, ErrorMessage = "Telefone não pode exceder 20 caracteres")]
        public string? Telefone { get; set; }

        public DateTime DataCadastro { get; set; }

        // Endereço
        [Required(ErrorMessage = "CEP é obrigatório")]
        public string CEP { get; set; }

        [Required(ErrorMessage = "Logradouro é obrigatório")]
        public string Logradouro { get; set; }

        [Required(ErrorMessage = "Número é obrigatório")]
        public string Numero { get; set; }

        public string? Complemento { get; set; }

        [Required(ErrorMessage = "Bairro é obrigatório")]
        public string Bairro { get; set; }

        [Required(ErrorMessage = "Cidade é obrigatória")]
        public string Cidade { get; set; }

        [Required(ErrorMessage = "Estado é obrigatório")]
        [StringLength(2, ErrorMessage = "UF deve ter 2 caracteres")]
        public string Estado { get; set; }

        public int idUsuario { get; set; }

        // DTO para Entidade 
        public Cliente ToEntity()
        {
            var cliente = new Cliente()
            {
                Id = this.Id,
                Nome = this.Nome,
                Documento = this.Documento,
                Telefone = this.Telefone,
                DataCadastro = this.DataCadastro,
                UsuarioId = this.idUsuario,

            };

            cliente.Enderecos.Add(new EnderecoCliente
            {
                Cep = this.CEP,
                Logradouro = this.Logradouro,
                Numero = this.Numero,
                Complemento = this.Complemento,
                Bairro = this.Bairro,
                Cidade = this.Cidade,
                Estado = this.Estado,
                ClienteId = this.Id
            });

           
            return cliente;
        }

        //Entidade para DTO
        public static ClienteDTO FromEntity(Cliente cliente)
        {
            if (cliente == null) return null;

            var endereco = cliente.Enderecos.FirstOrDefault();

            return new ClienteDTO
            {
                Id = cliente.Id,
                Nome = cliente.Nome,
                Documento = cliente.Documento,
                Telefone = cliente.Telefone,
                DataCadastro = cliente.DataCadastro,
                CEP = endereco?.Cep,
                Logradouro = endereco?.Logradouro,
                Numero = endereco?.Numero,
                Complemento = endereco?.Complemento,
                Bairro = endereco?.Bairro,
                Cidade = endereco?.Cidade,
                Estado = endereco?.Estado
            };
        }
    }
}
