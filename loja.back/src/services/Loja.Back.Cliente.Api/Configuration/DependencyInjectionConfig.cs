using FluentValidation.Results;
using Loja.Back.Clientes.Api.Application.Commands;
using Loja.Back.Clientes.Api.Data;
using Loja.Back.Clientes.Api.Data.Repository;
using Loja.Back.Clientes.Api.Models;
using Loja.Back.Core.Mediator;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace Loja.Back.Clientes.Api.Configuration
{
    public static class DependencyInjectionConfig
    {
        public static void RegisterServices(this IServiceCollection services)
        {
            services.AddScoped<IMediatorHandler, MediatorHandler>();

            services.AddScoped<IRequestHandler<RegistrarClienteCommand, ValidationResult>, ClienteCommandHandler>();

            //services.AddScoped<INotificationHandler<ClienteRegistradoEvent>, ClienteEventHandler>();

            services.AddScoped<IClienteRepository, ClienteRepository>();

            services.AddScoped<ClientesContext>();
        }
    }
}
