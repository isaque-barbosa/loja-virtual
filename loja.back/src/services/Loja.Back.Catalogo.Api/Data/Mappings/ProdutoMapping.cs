using Loja.Back.Catalogo.Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Loja.Back.Catalogo.Api.Data.Mappings
{
    public class ProdutoMapping : IEntityTypeConfiguration<Produto>
    {
        public void Configure(EntityTypeBuilder<Produto> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(x => x.Nome)
                .IsRequired()
                .HasColumnType("varchar(250)");

            builder.Property(x => x.Categoria)
                .IsRequired()
                .HasColumnType("varchar(250)");

            builder.Property(x => x.Descricao)
                .IsRequired()
                .HasColumnType("varchar(500)");

            builder.Property(x => x.Imagem)
                .IsRequired()
                .HasColumnType("varchar(250)");

            builder.ToTable("Produtos");
        }
    }
}
