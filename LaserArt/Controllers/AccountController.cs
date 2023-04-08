using API.Requests.Account;
using API.Requests.Account.Register;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;
using Services.Models;
using Utils.Constants;

namespace API.Controllers
{
    [ApiController]
    [Route(Routes.DefaultRoute)]
    public class AccountController : BaseController
    {
        private readonly IUserService userService;

        public AccountController(IUserService userService) => this.userService = userService;

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> LoginAsync([FromForm] LoginRequest request)
        {
            var result = await userService.LoginAsync(request.Email, request.Password);
            return HandleResult(result);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<UserModel>> RegisterAsync([FromForm] RegisterRequest request, string callbackUrl)
        {
            return await RegisterAsync<UserModel>(request, callbackUrl);
        }

        [HttpPost(Roles.Employee)]
        [Authorize(Roles = Roles.Admin)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<EmployeeModel>> RegisterAsync([FromForm] EmployeeRegisterRequest request, string callbackUrl)
        {
            return await RegisterAsync<EmployeeModel>(request, callbackUrl);
        }

        private async Task<ActionResult<T>> RegisterAsync<T>(RegisterRequest request, string callbackUrl) where T : UserModel
        {
            var model = request.CreateModel();
            var result = await userService.RegisterAsync<T>(model, callbackUrl);
            return HandleCreatedResult(result);
        }

        [HttpDelete]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> LogoutAsync()
        {
            await userService.LogoutAsync();
            return Ok();
        }

        [HttpGet]
        [Authorize(Roles = Roles.Customer)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<UserModel?>> GetCustomerAsync() => await userService.GetUser<UserModel>(User);


        [HttpGet]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<string?>> RoleAsync() => await userService.GetRole(User);

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status302Found)]
        public async Task<IActionResult> ConfirmEmailAsync(string id, string code)
        {
            var result = await userService.ConfirmEmailAsync(id, code);
            return HandleResult(result);
        }

        [HttpDelete]
        [Authorize(Roles = Roles.Customer)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteAsync()
        {
            var result = await userService.DeleteAsync(User);
            return HandleResult(result);
        }

        [HttpPut]
        [Authorize(Roles = Roles.Customer)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<IActionResult> ChangeName([FromForm] ChangeNameRequest model)
        {
            var result = await userService.ChangeNameAsync(model.Name, User);
            return HandleResult(result);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> ForgotPassword([FromForm] ForgotPasswordRequest model, string callbackUrl)
        {
            var result = await userService.ForgotPasswordAsync(model.Email, callbackUrl);
            return result.IsSuccess ? Ok() : NotFound();
        }

        [HttpPatch]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> ResetPasswordAsync([FromForm] ResetPasswordRequest model)
        {
            var result = await userService.ResetPasswordAsync(model.Email, model.Password, model.Code);
            return HandleResult(result);
        }

        [HttpPatch]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<IActionResult> ChangePasswordAsync([FromForm] ChangePasswordRequest model)
        {
            var result = await userService.ChangePasswordAsync(model.OldPassword, model.NewPassword, User);
            return HandleResult(result);
        }

        [HttpPatch]
        [Authorize(Roles = Roles.Customer)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<IActionResult> AddPasswordAsync([FromForm] AddPasswordRequest model)
        {
            var result = await userService.AddPasswordAsync(model.NewPassword, User);
            return HandleResult(result);
        }

        [HttpGet]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<bool>> HasPasswordAsync() => await userService.CheckPassword(User);
    }
}
