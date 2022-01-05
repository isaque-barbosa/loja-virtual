using FluentValidation.Results;
using Loja.Back.Core.Messages;
using System.Threading.Tasks;

namespace Loja.Back.Core.Mediator
{
    public interface IMediatorHandler
    {
        Task PublicarEvento<T>(T evento) where T : Event;
        Task<ValidationResult> EnviarComando<T>(T comando) where T : Command;
    }
}
