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
        public DbSet<Tarefa> Tarefa { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Usuario>()
                .HasMany(u => u.Clientes)
                .WithOne(c => c.Usuario)
                .HasForeignKey(c => c.UsuarioId);


            modelBuilder.Entity<Usuario>()
                .HasMany(u => u.Joias)
                .WithOne(j => j.Usuario)
                .HasForeignKey(j => j.UsuarioId);


            modelBuilder.Entity<Usuario>()
                .HasMany(u => u.Pedidos)
                .WithOne(p => p.Usuario)
                .HasForeignKey(p => p.UsuarioId);

            modelBuilder.Entity<Usuario>()
                .HasMany(u => u.Tarefas)          
                .WithOne(t => t.Usuario)           
                .HasForeignKey(t => t.UsuarioId);  


            modelBuilder.Entity<Cliente>()
                .HasMany(c => c.Enderecos)
                .WithOne(e => e.Cliente)
                .HasForeignKey(e => e.ClienteId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Cliente>()
                .HasMany(c => c.Pedidos)
                .WithOne(p => p.Cliente)
                .HasForeignKey(p => p.ClienteId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Cliente>()
                .HasMany(c => c.Pagamentos)
                .WithOne(pg => pg.Cliente)
                .HasForeignKey(pg => pg.ClienteId)
                .OnDelete(DeleteBehavior.Cascade);


            modelBuilder.Entity<Pedido>()
                .HasMany(p => p.Pagamentos)
                .WithOne(pg => pg.Pedido)
                .HasForeignKey(pg => pg.PedidoId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Pedido>()
                .HasMany(p => p.JoiasPedidos)
                .WithOne(jp => jp.Pedido)
                .HasForeignKey(jp => jp.PedidoId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Joia>()
                .HasMany(j => j.JoiasPedidos)
                .WithOne(jp => jp.Joia)
                .HasForeignKey(jp => jp.JoiaId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<EnderecoCliente>()
                .HasOne(e => e.Cliente)
                .WithMany(c => c.Enderecos)
                .HasForeignKey(e => e.ClienteId)
                .OnDelete(DeleteBehavior.Cascade);

            // Pedidos do Cliente
            modelBuilder.Entity<Pedido>()
                .HasOne<Cliente>()
                .WithMany(c => c.Pedidos)
                .HasForeignKey(p => p.ClienteId)
                .OnDelete(DeleteBehavior.Cascade);

            // Pagamentos do Cliente
            modelBuilder.Entity<Pagamento>()
                .HasOne(p => p.Cliente)
                .WithMany(c => c.Pagamentos)
                .HasForeignKey(p => p.ClienteId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
