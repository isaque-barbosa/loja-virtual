using Loja.Back.Pedidos.Domain.Pedidos;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Loja.Back.Pedidos.Infra.Data.Mappings
{
    public class PedidoMapping : IEntityTypeConfiguration<Pedido>
    {
        public void Configure(EntityTypeBuilder<Pedido> builder)
        {
            builder.HasKey(x => x.Id);

            builder.OwnsOne(x => x.Endereco, e =>
            {
                e.Property(p => p.Logradouro)
                .HasColumnName("Logradouro");

                e.Property(p => p.Numero)
                .HasColumnName("Numero");

                e.Property(p => p.Complemento)
                .HasColumnName("Complemento");

                e.Property(p => p.Bairro)
                .HasColumnName("Bairro");

                e.Property(p => p.Cep)
                .HasColumnName("Cep");

                e.Property(p => p.Cidade)
                .HasColumnName("Cidade");

                e.Property(p => p.Estado)
                .HasColumnName("Estado");
            });

            builder.Property(x => x.Codigo)
                .HasDefaultValueSql("NEXT VALUE FOR MinhaSequencia");

            builder.HasMany(x => x.PedidoItems)
                .WithOne(x => x.Pedido)
                .HasForeignKey(x => x.PedidoId);

            builder.ToTable("Pedidos");
        }
    }
}
