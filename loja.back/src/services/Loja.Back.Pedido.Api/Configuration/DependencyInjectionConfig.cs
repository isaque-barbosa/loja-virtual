using Loja.Back.Core.Mediator;
using Loja.Back.Pedidos.Api.Application.Queries;
using Loja.Back.Pedidos.Domain.Vouchers;
using Loja.Back.Pedidos.Infra.Data;
using Loja.Back.Pedidos.Infra.Data.Repository;
using Loja.Back.WebAPI.Core.Usuario;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

namespace Loja.Back.Pedidos.Api.Configuration
{
    public static class DependencyInjectionConfig
    {
        public static void RegisterServices(this IServiceCollection services)
        {
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddScoped<IAspNetUser, AspNetUser>();

            services.AddScoped<IMediatorHandler, MediatorHandler>();
            services.AddScoped<IVoucherQueries, VoucherQueries>();

            services.AddScoped<IVoucherRepository, VoucherRepository>();
            services.AddScoped<PedidosContext>();
        }
    }
}
