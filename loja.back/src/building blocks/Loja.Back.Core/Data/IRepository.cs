using Loja.Back.Core.DomainObjects;
using System;

namespace Loja.Back.Core.Data
{
    public interface IRepository<T> : IDisposable where T : IAggregateRoot
    {
        IUnitOfWork UnitOfWork { get; }
    }
}
