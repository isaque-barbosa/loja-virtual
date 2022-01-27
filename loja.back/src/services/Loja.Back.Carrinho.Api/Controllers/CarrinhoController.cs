using Loja.Back.Carrinho.Api.Data;
using Loja.Back.Carrinho.Api.Models;
using Loja.Back.WebAPI.Core.Controllers;
using Loja.Back.WebAPI.Core.Usuario;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Loja.Back.Carrinho.Api.Controllers
{
    [Authorize]
    public class CarrinhoController : MainController
    {
        private readonly IAspNetUser _user;
        private readonly CarrinhoContext _context;

        public CarrinhoController(IAspNetUser user, CarrinhoContext context)
        {
            _user = user;
            _context = context;
        }

        [HttpGet("carrinho")]
        public async Task<CarrinhoCliente> ObterCarrinho()
        {
            return await ObterCarrinhoCliente() ?? new CarrinhoCliente();
        }

        [HttpGet("carrinho/obter-quantidade-itens")]
        [AllowAnonymous]
        public async Task<int> ObterQuantidadeItensCarrinho()
        {
            if (_user.ObterUserId() == Guid.Empty) return 0;

            var carrinho = await ObterCarrinhoCliente() ?? new CarrinhoCliente();

            return carrinho.ObterQuantidadeItens();
        }

        [HttpPost("carrinho/adicionar-item")]
        public async Task<IActionResult> AdicionarItemCarrinho(CarrinhoItem item)
        {
            var carrinho = await ObterCarrinhoCliente();

            var produto = await ObterProdutoPorId(item.ProdutoId, item.Quantidade);
            if (!OperacaoValida()) CustomResponse();

            item.Nome = produto.Nome;
            item.Valor = produto.Valor;
            item.Imagem = produto.Imagem;

            if (carrinho is null)
            {
                ManipularNovoCarrinho(item);
            }
            else
            {
                ManipularCarrinhoExistente(carrinho, item);
            }

            if (!OperacaoValida()) return CustomResponse();

            await PersistirDados();

            return CustomResponse();
        }

        [HttpPut("carrinho/atualizar-item/{produtoId}/{quantidade}")]
        public async Task<IActionResult> AtualizarItemCarrinho(Guid produtoId, int quantidade)
        {
            var produto = await ObterProdutoPorId(produtoId, quantidade);
            if (!OperacaoValida()) CustomResponse();

            var item = new CarrinhoItem(produtoId, produto.Nome, quantidade, produto.Valor, produto.Imagem);
            //item.Nome = produto.Nome;
            //item.Valor = produto.Valor;
            //item.Imagem = produto.Imagem;

            var carrinho = await ObterCarrinhoCliente();
            var itemCarrinho = await ObterItemCarrinhoValidado(produtoId, carrinho, item);

            if (itemCarrinho is null) return CustomResponse();

            carrinho.AtualizarUnidades(itemCarrinho, item.Quantidade);

            ValidarCarrinho(carrinho);
            if (!OperacaoValida()) return CustomResponse();

            _context.CarrinhoItens.Update(itemCarrinho);
            _context.CarrinhoCliente.Update(carrinho);

            await PersistirDados();

            return CustomResponse();
        }

        [HttpDelete("carrinho/remover-item/{produtoId}")]
        public async Task<IActionResult> RemoverItemCarrinho(Guid produtoId)
        {
            //Mudar futuramente
            var produto = await _context.Produtos.FirstOrDefaultAsync(x => x.Id == produtoId);
            if(produto is null)
            {
                AdicionarErroProcessamento("Produto Inválido.");
                return CustomResponse();
            }

            var carrinho = await ObterCarrinhoCliente();
            var itemCarrinho = await ObterItemCarrinhoValidado(produtoId, carrinho);

            if (itemCarrinho is null) return CustomResponse();

            ValidarCarrinho(carrinho);
            if (!OperacaoValida()) return CustomResponse();

            carrinho.RemoverItem(itemCarrinho);

            _context.CarrinhoItens.Remove(itemCarrinho);
            _context.CarrinhoCliente.Update(carrinho);

            await PersistirDados();

            return CustomResponse();
        }

        private async Task<Produto> ObterProdutoPorId(Guid id, int quantidade)
        {
            try
            {
                var produto = await _context.Produtos.FirstAsync(x => x.Id == id);
                if (quantidade < 1) AdicionarErroProcessamento($"Escolha ao menos uma unidade do produto {produto.Nome}.");
                if (quantidade > produto.QuantidadeEstoque) 
                    AdicionarErroProcessamento($"O produto {produto.Nome} possui {produto.QuantidadeEstoque} unidades em estoque," +
                                                $" você selecionou {quantidade}.");
                return produto;
            }
            catch(Exception e)
            {
                AdicionarErroProcessamento("Produto Inválido.");
                return null;
            }            
        }

        private async Task<CarrinhoCliente> ObterCarrinhoCliente()
        {
            return await _context.CarrinhoCliente
                                 .Include(x => x.Itens)
                                 .FirstOrDefaultAsync(x => x.ClienteId == _user.ObterUserId());
        }

        private void ManipularNovoCarrinho(CarrinhoItem item)
        {
            var carrinho = new CarrinhoCliente(_user.ObterUserId());

            carrinho.AdicionarItem(item);

            ValidarCarrinho(carrinho);

            _context.CarrinhoCliente.Add(carrinho);
        }

        private void ManipularCarrinhoExistente(CarrinhoCliente carrinho, CarrinhoItem item)
        {
            var produtoItemExistente = carrinho.CarrinhoItemExistente(item);

            carrinho.AdicionarItem(item);
            ValidarCarrinho(carrinho);

            if (produtoItemExistente)
            {
                _context.CarrinhoItens.Update(carrinho.ObterPorProdutoId(item.ProdutoId));
            }
            else
            {
                _context.CarrinhoItens.Add(item);
            }

            _context.CarrinhoCliente.Update(carrinho);

        }

        private async Task<CarrinhoItem> ObterItemCarrinhoValidado(Guid produtoId, CarrinhoCliente carrinho, CarrinhoItem item = null)
        {
            if (item is not null && produtoId != item.ProdutoId)
            {
                AdicionarErroProcessamento("O Item não corresponde ao informado.");
                return null;
            }

            if (carrinho is null)
            {
                AdicionarErroProcessamento("Carrinho não encontrado.");
                return null;
            }

            var itemCarrinho = await _context.CarrinhoItens
                                        .FirstOrDefaultAsync(x => x.CarrinhoId == carrinho.Id && x.ProdutoId == produtoId);

            if (itemCarrinho is null || !carrinho.CarrinhoItemExistente(itemCarrinho))
            {
                AdicionarErroProcessamento("O Item não está no carrinho.");
                return null;
            }

            return itemCarrinho;
        }

        private async Task PersistirDados()
        {
            var result = await _context.SaveChangesAsync();
            if (result <= 0) AdicionarErroProcessamento("Não foi possível persistir os dados no banco.");
        }

        private bool ValidarCarrinho(CarrinhoCliente carrinho)
        {
            if (carrinho.EhValido()) return true;

            carrinho.ValidationResult.Errors.ToList().ForEach(x => AdicionarErroProcessamento(x.ErrorMessage));
            return false;
        }
    }
}
