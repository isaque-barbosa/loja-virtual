using Loja.Back.Bff.Compras.Extensions;
using Loja.Back.Bff.Compras.Models;
using Loja.Back.Core.Communication;
using Microsoft.Extensions.Options;
using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace Loja.Back.Bff.Compras.Services
{
    public interface ICarrinhoService
    {
        Task<CarrinhoDTO> ObterCarrinho();
        Task<ResponseResult> AdicionarItemCarrinho(ItemCarrinhoDTO produto);
        Task<ResponseResult> AtualizarItemCarrinho(Guid produtoId, ItemCarrinhoDTO carrinho);
        Task<ResponseResult> RemoverItemCarrinho(Guid produtoId);
    }

    public class CarrinhoService : Service, ICarrinhoService
    {
        private readonly HttpClient _httpClient;

        public CarrinhoService(HttpClient httpClient, IOptions<AppServicesSettings> settings)
        {
            _httpClient = httpClient;
            _httpClient.BaseAddress = new Uri(settings.Value.CarrinhoUrl);
        }

        public async Task<CarrinhoDTO> ObterCarrinho()
        {
            var response = await _httpClient.GetAsync("/carrinho/");

            TratarErrosResponse(response);

            return await DeserializarObjetoResponse<CarrinhoDTO>(response);
        }

        public async Task<ResponseResult> AdicionarItemCarrinho(ItemCarrinhoDTO produto)
        {
            var itemContent = ObterConteudo(produto);

            var response = await _httpClient.PostAsync("/carrinho/adicionar-item/", itemContent);

            if (!TratarErrosResponse(response)) return await DeserializarObjetoResponse<ResponseResult>(response);

            return RetornoOk();
        }

        public async Task<ResponseResult> AtualizarItemCarrinho(Guid produtoId, ItemCarrinhoDTO carrinho)
        {
            var itemContent = ObterConteudo(carrinho);

            var response = await _httpClient.PutAsync($"carrinho/atualizar-item/{produtoId}/", itemContent);

            if (!TratarErrosResponse(response)) return await DeserializarObjetoResponse<ResponseResult>(response);

            return RetornoOk();
        }

        public async Task<ResponseResult> RemoverItemCarrinho(Guid produtoId)
        {
            var response = await _httpClient.DeleteAsync($"/carrinho/remover-item/{produtoId}/");

            if (!TratarErrosResponse(response)) return await DeserializarObjetoResponse<ResponseResult>(response);

            return RetornoOk();
        }
    }
}
