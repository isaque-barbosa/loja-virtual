using FluentValidation;
using System;
using System.Text.Json.Serialization;

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

        internal void AtualizarUnidades(int unidades)
        {
            Quantidade = unidades;
        }

        internal bool EhValido()
        {
            return new ItemCarrinhoValidation().Validate(this).IsValid;
        }

        public class ItemCarrinhoValidation : AbstractValidator<CarrinhoItem>
        {
            public ItemCarrinhoValidation()
            {
                RuleFor(x => x.ProdutoId)
                    .NotEqual(Guid.Empty)
                    .WithMessage("Id do Produto Inválido.");

                RuleFor(x => x.Nome)
                    .NotEmpty()
                    .WithMessage("O nome do Produto não foi informado.");

                RuleFor(x => x.Quantidade)
                    .GreaterThan(0)
                    .WithMessage(item => $"A quantidade mínima para o {item.Nome} é 1.");

                RuleFor(x => x.Quantidade)
                    .LessThan(CarrinhoCliente.MAX_QUANTIDADE_ITEM)
                    .WithMessage(item => $"A quantidade máxima do {item.Nome} é {CarrinhoCliente.MAX_QUANTIDADE_ITEM}.");

                RuleFor(x => x.Valor)
                    .GreaterThan(0)
                    .WithMessage(item => $"O Valor do {item.Nome} precisa ser maior do que 0.");
            }
        }
    }
}
