using Loja.Back.Pedidos.Domain.Pedidos;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Loja.Back.Pedidos.Infra.Data.Mappings
{
    public class PedidoItemMapping : IEntityTypeConfiguration<PedidoItem>
    {
        public void Configure(EntityTypeBuilder<PedidoItem> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(x => x.ProdutoNome)
                .IsRequired()
                .HasColumnName("varchar(250)");

            builder.HasOne(x => x.Pedido)
                .WithMany(x => x.PedidoItems);

            builder.ToTable("PedidoItems");
        }
    }
}
