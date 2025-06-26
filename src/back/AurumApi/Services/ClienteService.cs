using AurumApi.Data;
using AurumApi.DTO;
using AurumApi.DTO.Response;
using AurumApi.Models;
using AurumApi.Services.Interface;
using Microsoft.EntityFrameworkCore;

namespace AurumApi.Services
{
    public class ClienteService : IClienteService
    {
        private readonly AurumDataContext _aurumDataContext;

        public ClienteService(AurumDataContext aurumDataContext)
        {
            _aurumDataContext = aurumDataContext;
        }

        public async Task<IEnumerable<ClienteDTO>> ObterTodos(int idUsuario)
        {
            return await _aurumDataContext.Clientes
                .Where(c => c.UsuarioId == idUsuario)
                .Include(c => c.Enderecos)
                .Include(c => c.Usuario)
                .Select(c => ClienteDTO.FromEntity(c))
                .ToListAsync();
        }

        public async Task<ClienteDTO> ObterPorId(int id)
        {
            var cliente = await _aurumDataContext.Clientes
               .Include(c => c.Enderecos)
               .Include(c => c.Usuario)
               .FirstOrDefaultAsync(c => c.Id == id);

            return cliente != null ? ClienteDTO.FromEntity(cliente) : null;
        }

        public async Task<ClienteDTO> Criar(ClienteDTO clienteDTO)
        {
            var cliente = clienteDTO.ToEntity();
            _aurumDataContext.Clientes.Add(cliente);
            await _aurumDataContext.SaveChangesAsync();
            return ClienteDTO.FromEntity(cliente);
        }

        public async Task<bool> Atualizar(int id, ClienteDTO clienteDTO)
        {
            var clienteExistente = await _aurumDataContext.Clientes
                 .Include(c => c.Enderecos)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (clienteExistente == null) return false;

            // Atualiza os dados básicos
            clienteExistente.Nome = clienteDTO.Nome;
            clienteExistente.Documento = clienteDTO.Documento;
            clienteExistente.Telefone = clienteDTO.Telefone;

            // Atualiza o endereço
            var endereco = clienteExistente.Enderecos.FirstOrDefault();
            if (endereco == null)
            {
                endereco = new EnderecoCliente { ClienteId = id };
                clienteExistente.Enderecos.Add(endereco);
            }

            endereco.Cep = clienteDTO.CEP;
            endereco.Logradouro = clienteDTO.Logradouro;
            endereco.Numero = clienteDTO.Numero;
            endereco.Complemento = clienteDTO.Complemento;
            endereco.Bairro = clienteDTO.Bairro;
            endereco.Cidade = clienteDTO.Cidade;
            endereco.Estado = clienteDTO.Estado;


            await _aurumDataContext.SaveChangesAsync();
            return true;
        }

        public async Task<bool> Remover(int id)
        {
            var cliente = await _aurumDataContext.Clientes.FindAsync(id);
            if (cliente == null) return false;

            _aurumDataContext.Clientes.Remove(cliente);
            await _aurumDataContext.SaveChangesAsync();
            return true;
        }

        public async Task<bool> VerificarExistencia(int id)
        {
            return await _aurumDataContext.Clientes.AnyAsync(c => c.Id == id);
        }
    }
}