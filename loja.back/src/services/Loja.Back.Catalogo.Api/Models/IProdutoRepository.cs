﻿using Loja.Back.Core.Data;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Loja.Back.Catalogo.Api.Models
{
    public interface IProdutoRepository : IRepository<Produto>
    {
        Task<IEnumerable<Produto>> ObterTodos();
        Task<Produto> ObterPorId(Guid id);

        void Adicionar(Produto produto);
        void Atualizar(Produto produto);
    }
}
