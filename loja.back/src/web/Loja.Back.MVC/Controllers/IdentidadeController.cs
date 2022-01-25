using Loja.Back.MVC.Models;
using Loja.Back.MVC.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Loja.Back.MVC.Controllers
{
    public class IdentidadeController : MainController
    {
        private readonly IAutenticacaoService _autenticacaoService;

        public IdentidadeController(IAutenticacaoService autenticacaoService)
        {
            _autenticacaoService = autenticacaoService;
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(UsuarioLogin usuarioLogin)
        {
            if (!ModelState.IsValid) return Ok();

            var resposta = await _autenticacaoService.Login(usuarioLogin);

            if (ResponsePossuiErros(resposta.ResponseResult)) return Ok(resposta.ResponseResult);

            await RealizarLogin(resposta);

            return Ok(resposta);
        }

        private async Task RealizarLogin(UsuarioRespostaLogin resposta)
        {
            var token = ObterTokenFormatado(resposta.UsuarioResposta.AccessToken);

            var claims = new List<Claim>();
            claims.Add(new Claim("JWT", resposta.UsuarioResposta.AccessToken));
            claims.AddRange(token.Claims);

            var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

            var authProperties = new AuthenticationProperties
            {
                ExpiresUtc = DateTimeOffset.UtcNow.AddMinutes(60),
                IsPersistent = true
            };

            await HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(claimsIdentity),
                authProperties);
        }

        private static JwtSecurityToken ObterTokenFormatado(string jwtToken)
        {
            return new JwtSecurityTokenHandler().ReadToken(jwtToken) as JwtSecurityToken;
        }
    }
}
