using Loja.Back.Catalogo.Api.Models;
using Loja.Back.WebAPI.Core.Controllers;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Loja.Back.Catalogo.Api.Controllers
{
    public class CatalogoController : MainController
    {
        private readonly IProdutoRepository _produtoRepository;

        public CatalogoController(IProdutoRepository produtoRepository)
        {
            _produtoRepository = produtoRepository;
        }

        [HttpGet("catalogo/produtos")]
        public async Task<IEnumerable<ProdutoViewModel>> Index()
        {
            var produtos = await _produtoRepository.ObterTodos();
            return produtos.Select(x => x.ParaViewModel()).ToList();
        }

        [HttpGet("catalogo/produtos/{id}")]
        public async Task<ProdutoViewModel> ProdutoDetalhe(Guid id)
        {
            var produto = await _produtoRepository.ObterPorId(id);
            return produto.ParaViewModel();
        }
    }
}
