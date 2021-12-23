using Loja.Back.Catalogo.Api.Data;
using Loja.Back.Catalogo.Api.Data.Repository;
using Loja.Back.Catalogo.Api.Models;
using Microsoft.Extensions.DependencyInjection;

namespace Loja.Back.Catalogo.Api.Configuration
{
    public static class DependencyInjectionConfig
    {
        public static void RegisterServices(this IServiceCollection services)
        {
            services.AddScoped<IProdutoRepository, ProdutoRepository>();
            services.AddScoped<CatalogoContext>();
        }
    }
}
