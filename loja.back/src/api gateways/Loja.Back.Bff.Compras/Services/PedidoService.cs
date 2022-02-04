using Loja.Back.Bff.Compras.Extensions;
using Microsoft.Extensions.Options;
using System;
using System.Net.Http;

namespace Loja.Back.Bff.Compras.Services
{
    public interface IPedidoService
    {
    }

    public class PedidoService : Service, IPedidoService
    {
        private readonly HttpClient _httpClient;

        public PedidoService(HttpClient httpClient, IOptions<AppServicesSettings> settings)
        {
            _httpClient = httpClient;
            _httpClient.BaseAddress = new Uri(settings.Value.PedidoUrl);
        }
    }
}
