namespace AurumApi.DTO.Response
{
    public class LoginResponse
    {
        public string? token { get; set; }
        public UsuarioDTO? usuario { get; set; }
        public string? mensagem { get; set; }
    }
}
