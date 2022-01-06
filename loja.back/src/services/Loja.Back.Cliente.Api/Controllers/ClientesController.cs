using Loja.Back.Clientes.Api.Application.Commands;
using Loja.Back.Core.Mediator;
using Loja.Back.WebAPI.Core.Controllers;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Loja.Back.Clientes.Api.Controllers
{
    public class ClientesController : MainController
    {
        private readonly IMediatorHandler _mediatorHandler;

        public ClientesController(IMediatorHandler mediatorHandler)
        {
            _mediatorHandler = mediatorHandler;
        }

        [HttpGet("clientes")]
        public async Task<IActionResult> Index()
        {
            var resultado = await _mediatorHandler
                                        .EnviarComando(new RegistrarClienteCommand(
                                            Guid.NewGuid(), "Isaque", "isaque@teste.com", "77373959032"));

            return CustomResponse(resultado);
        }
    }
}
