using System.Threading.Tasks;

namespace Loja.Back.Core.Data
{
    public interface IUnitOfWork
    {
        Task<bool> Commit();
    }
}
