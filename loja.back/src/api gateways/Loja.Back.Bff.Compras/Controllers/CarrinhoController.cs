using Loja.Back.Bff.Compras.Models;
using Loja.Back.Bff.Compras.Services;
using Loja.Back.WebAPI.Core.Controllers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Loja.Back.Bff.Compras.Controllers
{
    [Authorize]
    public class CarrinhoController : MainController
    {
        private readonly ICarrinhoService _carrinhoService;
        private readonly ICatologoService _catalogoService;
        private readonly IPedidoService _pedidoService;

        public CarrinhoController(ICarrinhoService carrinhoService,
            ICatologoService catologoService, IPedidoService pedidoService)
        {
            _carrinhoService = carrinhoService;
            _catalogoService = catologoService;
            _pedidoService = pedidoService;
        }

        [HttpGet]
        [Route("compras/carrinho")]
        public async Task<IActionResult> Index()
        {
            return CustomResponse(await _carrinhoService.ObterCarrinho());
        }

        [HttpGet]
        [Route("compras/carrinho-quantidade")]
        [AllowAnonymous]
        public async Task<int> ObterQuantidadeCarrinho()
        {
            var carrinho = await _carrinhoService.ObterCarrinho();
            return carrinho?.Itens.Sum(x => x.Quantidade) ?? 0;
        }

        [HttpPost]
        [Route("compras/carrinho/items")]
        public async Task<IActionResult> AdicionarItemCarrinho(ItemCarrinhoDTO itemProduto)
        {
            var produto = await _catalogoService.ObterPorId(itemProduto.ProdutoId);

            await ValidarItemCarrinho(produto, itemProduto.Quantidade);
            if (!OperacaoValida()) return CustomResponse();

            itemProduto.Nome = produto.Nome;
            itemProduto.Valor = produto.Valor;
            itemProduto.Imagem = produto.Imagem;

            var resposta = await _carrinhoService.AdicionarItemCarrinho(itemProduto);

            return CustomResponse(resposta);
        }

        [HttpPut]
        [Route("compras/carrinho/items/{produtoId}")]
        public async Task<IActionResult> AtualizarItemCarrinho(Guid produtoId, ItemCarrinhoDTO itemProduto)
        {
            var produto = await _catalogoService.ObterPorId(itemProduto.ProdutoId);

            await ValidarItemCarrinho(produto, itemProduto.Quantidade);
            if (!OperacaoValida()) return CustomResponse();

            itemProduto.Nome = produto.Nome;
            itemProduto.Valor = produto.Valor;
            itemProduto.Imagem = produto.Imagem;

            var resposta = await _carrinhoService.AtualizarItemCarrinho(produtoId, itemProduto);

            return CustomResponse(resposta);
        }

        [HttpDelete]
        [Route("compras/carrinho/items/{produtoId}")]
        public async Task<IActionResult> RemoverItemCarrinho(Guid produtoId)
        {
            var produto = await _catalogoService.ObterPorId(produtoId);

            if (produto is null)
            {
                AdicionarErroProcessamento("Produto inexistente.");
                return CustomResponse();
            }

            var resposta = await _carrinhoService.RemoverItemCarrinho(produtoId);

            return CustomResponse(resposta);
        }

        [HttpPost]
        [Route("compras/carrinho/aplicar-voucher/{voucherCodigo}")]
        public async Task<IActionResult> AplicarVoucher(string voucherCodigo)
        {
            var voucher = await _pedidoService.ObterVoucherPorCodigo(voucherCodigo);
            if(voucher is null)
            {
                AdicionarErroProcessamento("Voucher inválido ou não encontrado!");
                return CustomResponse();
            }

            var resposta = await _carrinhoService.AplicarVoucherCarrinho(voucher);

            return CustomResponse(resposta);
        }

        private async Task ValidarItemCarrinho(ItemProdutoDTO produto, int quantidade)
        {
            if (produto is null) AdicionarErroProcessamento("Produto inexistente!");
            if (quantidade < 1) AdicionarErroProcessamento($"Escolha ao menos uma unidade do produto {produto.Nome}");

            var carrinho = await _carrinhoService.ObterCarrinho();
            var itemCarrinho = carrinho.Itens.FirstOrDefault(x => x.ProdutoId == produto.Id);

            if (itemCarrinho is not null && itemCarrinho.Quantidade + quantidade > produto.QuantidadeEstoque)
            {
                AdicionarErroProcessamento($"O produto {produto.Nome} possui {produto.QuantidadeEstoque} unidades em estoque," +
                                                $" você selecionou {quantidade}.");
                return;
            }

            if (quantidade > produto.QuantidadeEstoque) AdicionarErroProcessamento($"O produto {produto.Nome}" +
                                                $" possui {produto.QuantidadeEstoque} unidades em estoque, você selecionou {quantidade}.");
        }
    }
}
