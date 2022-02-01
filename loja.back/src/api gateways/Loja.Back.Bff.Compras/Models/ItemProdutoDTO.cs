using System;
using System.Linq;
using System.Threading.Tasks;

namespace Loja.Back.Bff.Compras.Models
{
    public class ItemProdutoDTO
    {
        public Guid Id { get; set; }
        public string Nome { get; set; }
        public decimal Valor { get; set; }
        public string Imagem { get; set; }
        public int QuantidadeEstoque { get; set; }
    }
}
