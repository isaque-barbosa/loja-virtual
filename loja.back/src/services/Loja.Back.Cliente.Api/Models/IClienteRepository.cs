using Loja.Back.Core.Data;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Loja.Back.Clientes.Api.Models
{
    public interface IClienteRepository : IRepository<Cliente>
    {
        void Adicionar(Cliente cliente);

        Task<IEnumerable<Cliente>> ObterTodos();
        Task<Cliente> ObterPorCpf(string cpf);
    }
}
