using FluentValidation.Results;
using Loja.Back.Carrinho.Api.Models;
using Loja.Back.Core.Messages;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Loja.Back.Carrinho.Api.Data
{
    public sealed class CarrinhoContext : DbContext
    {
        public CarrinhoContext(DbContextOptions<CarrinhoContext> options) : base(options)
        {
            ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
            ChangeTracker.AutoDetectChangesEnabled = false;
        }

        public DbSet<CarrinhoItem> CarrinhoItens { get; set; }
        public DbSet<CarrinhoCliente> CarrinhoCliente { get; set; }
        public DbSet<Produto> Produtos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            foreach (var property in modelBuilder.Model.GetEntityTypes().SelectMany(
                e => e.GetProperties().Where(p => p.ClrType == typeof(string))))
                property.SetColumnType("varchar(100)");

            modelBuilder.Ignore<ValidationResult>();
            modelBuilder.Ignore<Event>();

            modelBuilder.Entity<CarrinhoCliente>()
                .HasIndex(x => x.ClienteId)
                .HasDatabaseName("IDX_Cliente");

            modelBuilder.Entity<CarrinhoCliente>()
                .HasMany(x => x.Itens)
                .WithOne(y => y.CarrinhoCliente)
                .HasForeignKey(x => x.CarrinhoId);

            foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
                relationship.DeleteBehavior = DeleteBehavior.ClientSetNull;
        }
    }
}
