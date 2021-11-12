using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static Loja.Back.Identidade.Api.Models.UserViewModels;

namespace Loja.Back.Identidade.Api.Controllers
{
    [ApiController]
    [Route("api/identidade")]
    public class AuthController : Controller
    {
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly UserManager<IdentityUser> _userManager;

        public AuthController(SignInManager<IdentityUser> signInManager, UserManager<IdentityUser> userManager)
        {
            _signInManager = signInManager;
            _userManager = userManager;
        }

        [HttpPost("nova-conta")]
        public async Task<IActionResult> Registrar(UsuarioRegistro model)
        {
            if (!ModelState.IsValid) return BadRequest();

            var user = new IdentityUser
            {
                UserName = model.Email,
                Email = model.Email,
                EmailConfirmed = true
            };

            var result = await _userManager.CreateAsync(user, model.Senha);

            if(result.Succeeded)
            {
                await _signInManager.SignInAsync(user, false);

                return Ok();
            }

            return BadRequest();
        }

        [HttpPost("autenticar")]
        public async Task<IActionResult> Login(UsuarioLogin model)
        {
            if (!ModelState.IsValid) return BadRequest();

            var result = await _signInManager.PasswordSignInAsync(model.Email, model.Senha, false, true);

            if (result.Succeeded)
            {
                return Ok();
            }

            return BadRequest();
        }
    }
}
