﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Loja.Back.Identidade.Api.Models
{
    public class UserViewModels
    {
        public class UsuarioRegistro
        {
            [Required(ErrorMessage = "O campo {0} é obrigatório")]
            public string Nome { get; set; }

            [Required(ErrorMessage = "O campo {0} é obrigatório")]
            public string Cpf { get; set; }

            [Required(ErrorMessage = "O campo {0} é obrigatório")]
            [EmailAddress(ErrorMessage = "O campo {0} está em formato inválido")]
            public string Email { get; set; }

            [Required(ErrorMessage = "O campo {0} é obrigatório")]
            [StringLength(100, ErrorMessage = "O campo {0} precisa ter entre {2} e {1} caracteres", MinimumLength = 6)]
            public string Senha { get; set; }

            [Compare("Senha", ErrorMessage = "As senhas não conferem")]
            public string SenhaConfirmacao { get; set; }
        }

        public class UsuarioLogin
        {
            [Required(ErrorMessage = "O campo {0} é obrigatório")]
            [EmailAddress(ErrorMessage = "O campo {0} está em formato inválido")]
            public string Email { get; set; }

            [Required(ErrorMessage = "O campo {0} é obrigatório")]
            [StringLength(100, ErrorMessage = "O campo {0} precisa ter entre {2} e {1} caracteres", MinimumLength = 6)]
            public string Senha { get; set; }
        }

        public class UsuarioRespostaLogin
        {
            public string AcessToken { get; set; }
            public double ExpireIn { get; set; }
            public UsuarioToken UsuarioToken { get; set; }
        }

        public class UsuarioToken
        {
            public string Id { get; set; }
            public string Email { get; set; }
            public IEnumerable<UsuarioClaim> Claims { get; set; }
        }

        public class UsuarioClaim
        {
            public string Value { get; set; }
            public string Type { get; set; }
        }
    }
}
