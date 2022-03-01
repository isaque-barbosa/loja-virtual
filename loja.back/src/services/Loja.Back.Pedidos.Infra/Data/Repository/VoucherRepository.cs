using Loja.Back.Core.Data;
using Loja.Back.Pedidos.Domain.Vouchers;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Loja.Back.Pedidos.Infra.Data.Repository
{
    public class VoucherRepository : IVoucherRepository
    {
        private readonly PedidosContext _context;

        public VoucherRepository(PedidosContext context)
        {
            _context = context;
        }

        public IUnitOfWork UnitOfWork => _context;

        public async Task<Voucher> ObterVoucherPorCodigo(string codigo)
        {
            return await _context.Vouchers.FirstOrDefaultAsync(x => x.Codigo == codigo);
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
