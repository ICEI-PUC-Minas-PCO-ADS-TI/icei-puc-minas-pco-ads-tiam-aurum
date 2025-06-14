﻿using AurumApi.DTO;
using AurumApi.DTO.Response;

namespace AurumApi.Services.Interface
{
    public interface IPedidoService
    {
        Task<IEnumerable<PedidoResponse>> GetPedidosByUsuarioId(int usuarioId);
        Task<PedidoResponse> GetPedidoById(int id);
        Task<IEnumerable<PedidoResponse>> GetPedidosByClienteId(int clienteId);
        Task<PedidoResponse> CreatePedido(int usuarioId, PedidoCreateDTO PedidoDto);
        Task<bool> DeletePedido(int id);
        Task<bool> RegistrarDevolucaoOuTroca(int joiaId, int tipo);

    }

    
}
