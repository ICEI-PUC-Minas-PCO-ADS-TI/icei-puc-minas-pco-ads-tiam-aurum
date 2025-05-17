using AurumApi.Models;
using Microsoft.EntityFrameworkCore;

namespace AurumApi.Data
{
    public class AurumDataContext : DbContext
    {
        public AurumDataContext(DbContextOptions<AurumDataContext> options) : base(options)
        {
        }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Cliente> Clientes { get; set; }
        public DbSet<Joia> Joias { get; set; }
        public DbSet<Pedido> Pedidos { get; set; }
        public DbSet<JoiaPedido> JoiasPedidos { get; set; }
        public DbSet<Pagamento> Pagamentos { get; set; }
        public DbSet<EnderecoCliente> EnderecosClientes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

        }
    }
}
