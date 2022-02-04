using Loja.Back.Core.Data;
using System.Threading.Tasks;

namespace Loja.Back.Pedidos.Domain.Vouchers
{
    public interface IVoucherRepository : IRepository<Voucher>
    {
        Task<Voucher> ObterVoucherPorCodigo(string codigo);
    }
}
