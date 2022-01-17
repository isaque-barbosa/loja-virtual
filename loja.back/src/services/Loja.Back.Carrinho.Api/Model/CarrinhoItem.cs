using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Loja.Back.Carrinho.Api.Model
{
    public class CarrinhoItem
    {
        public CarrinhoItem()
        {
            Id = Guid.NewGuid();
        }

        public Guid Id { get; set; }
        public Guid ProdutoId { get; set; }
        public string Nome { get; set; }
        public int Quantidade { get; set; }
        public decimal Valor { get; set; }
        public string Imagem { get; set; }

        public Guid CarrinhoId { get; set; }
        [JsonIgnore]
        public CarrinhoCliente CarrinhoCliente { get; set; }

        internal void AssociarCarrinho(Guid carrinhoId)
        {
            CarrinhoId = carrinhoId;
        }

        internal decimal CalcularValor()
        {
            return Quantidade * Valor;
        }

        internal void AdicionarUnidades(int unidades)
        {
            Quantidade += unidades;
        }

        internal bool EhValido()
        {
            return new ItemPedidoValidation().Validate(this).IsValid;
        }

        public class ItemPedidoValidation : AbstractValidator<CarrinhoItem>
        {
            public ItemPedidoValidation()
            {
                RuleFor(x => x.ProdutoId)
                    .NotEqual(Guid.Empty)
                    .WithMessage("Id do Produto Inválido.");

                RuleFor(x => x.Nome)
                    .NotEmpty()
                    .WithMessage("O nome do Produto não foi informado.");

                RuleFor(x => x.Quantidade)
                    .GreaterThan(0)
                    .WithMessage("A quantidade mínima de um Item é 1.");

                RuleFor(x => x.Quantidade)
                    .LessThan(CarrinhoCliente.MAX_QUANTIDADE_ITEM)
                    .WithMessage($"A quantidade máxima de um Item é {CarrinhoCliente.MAX_QUANTIDADE_ITEM}.");

                RuleFor(x => x.Valor)
                    .GreaterThan(0)
                    .WithMessage("O Valor do Item precisa ser maior do que 0.");
            }
        }
    }
}
