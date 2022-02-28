using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Loja.Back.Pedidos.Domain.Pedidos
{
    public enum PedidoStatus
    {
        Autorizado = 1,
        Pago,
        Recusado,
        Entregue,
        Cancelado
    }
}
