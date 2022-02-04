using System;

namespace Loja.Back.Catalogo.Api.Models
{
    public class ProdutoViewModel
    {
        public Guid Id { get; set; }
        public string Nome { get; set; }
        public string Categoria { get; set; }
        public string Descricao { get; set; }
        public decimal Valor { get; set; }
        public string Imagem { get; set; }

        public ProdutoViewModel(Guid id, string nome, string categoria, string descricao, decimal valor, string imagem)
        {
            Id = id;
            Nome = nome;
            Categoria = categoria;
            Descricao = descricao;
            Valor = valor;
            Imagem = imagem;
        }
    }
}
