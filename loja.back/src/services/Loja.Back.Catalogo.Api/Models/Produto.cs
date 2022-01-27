using Loja.Back.Core.DomainObjects;
using System;

namespace Loja.Back.Catalogo.Api.Models
{
    public class Produto : Entity, IAggregateRoot
    {
        public string Nome { get; set; }
        public string Categoria { get; set; }
        public string Descricao { get; set; }
        public bool Ativo { get; set; }
        public decimal Valor { get; set; }
        public DateTime DataCadastro { get; set; }
        public string Imagem { get; set; }
        public int QuantidadeEstoque { get; set; }

        internal ProdutoViewModel ParaViewModel()
        {
            return new ProdutoViewModel(this.Id, this.Nome, this.Categoria, this.Descricao, this.Valor, this.Imagem);
        }
    }
}
