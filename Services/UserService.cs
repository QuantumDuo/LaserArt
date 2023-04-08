using DataAccess.Entities.Users;
using FluentResults;
using Mapster;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Services.Interfaces;
using Services.Models;
using Services.Models.Register;
using System.Security.Claims;
using System.Text.Encodings.Web;
using Utils.Constants;
using static Services.Utils;

namespace Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
        private readonly IEmailSender emailSender;

        public UserService(UserManager<User> userManager,
                           SignInManager<User> signInManager,
                           IEmailSender emailSender,
                           RoleManager<IdentityRole> roleManager,
                           IConfiguration configuration) : base()
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.emailSender = emailSender;
            InitializeAsync(userManager, roleManager, configuration).Wait();
        }

        public async Task<Result> AddPasswordAsync(string password, ClaimsPrincipal principal)
        {
            var user = await userManager.GetUserAsync(principal);
            var result = await userManager.AddPasswordAsync(user!, password);
            return HandleResult(result);
        }

        public async Task<Result> ChangePasswordAsync(string oldPassword, string newPassword, ClaimsPrincipal principal)
        {
            var user = await userManager.GetUserAsync(principal);
            var result = await userManager.ChangePasswordAsync(user!, oldPassword, newPassword);
            return HandleResult(result);
        }

        public async Task<Result> ConfirmEmailAsync(string id, string code)
        {
            var user = await userManager.FindByIdAsync(id);
            if (user is null)
                return Result.Fail(string.Empty);
            var result = await userManager.ConfirmEmailAsync(user, code);
            return HandleResult(result);
        }

        public async Task<Result> DeleteAsync(ClaimsPrincipal principal)
        {
            var user = await userManager.GetUserAsync(principal);
            await signInManager.SignOutAsync();
            var result = await userManager.DeleteAsync(user!);
            return HandleResult(result);
        }

        public async Task<Result> ChangeNameAsync(string name, ClaimsPrincipal principal)
        {
            var user = await userManager.GetUserAsync(principal);
            user!.Name = name;
            var result = await userManager.UpdateAsync(user);
            return HandleResult(result);
        }

        public async Task<Result> ForgotPasswordAsync(string email, string callbackUrl)
        {
            var user = await userManager.FindByEmailAsync(email);
            if (user is not null && await userManager.IsEmailConfirmedAsync(user))
            {
                var code = await userManager.GeneratePasswordResetTokenAsync(user);
                callbackUrl += $"?email={email}&code={UrlEncoder.Default.Encode(code)}";
                _ = emailSender.SendEmailAsync(email, EmailTemplates.ForgotPassword, callbackUrl);
                return Result.Ok();
            }
            return Result.Fail(Errors.NotFound);
        }

        public async Task<Result> LoginAsync(string email, string password)
        {
            var result = await signInManager.PasswordSignInAsync(email, password, true, false);
            if (result.IsLockedOut)
                return Result.Fail(Errors.IsLockedOut);
            if (result.IsNotAllowed)
                return Result.Fail(Errors.IsNotAllowed);
            return result.Succeeded ? Result.Ok() : Result.Fail(Errors.InvalidCredentials);
        }

        public async Task LogoutAsync() => await signInManager.SignOutAsync();

        public async Task<Result<TModel>> RegisterAsync<TModel>(RegisterModel model, string callbackUrl) where TModel : UserModel
        {

            var user = model.Create();
            var result = await userManager.CreateAsync(user, model.Password);
            if (result.Succeeded)
            {
                result = await userManager.AddToRoleAsync(user, model.GetRole());
                if (result.Succeeded)
                {
                    var code = await userManager.GenerateEmailConfirmationTokenAsync(user);
                    callbackUrl += $"?id={user.Id}&code={UrlEncoder.Default.Encode(code)}";
                    _ = emailSender.SendEmailAsync(model.Email!, EmailTemplates.Register, callbackUrl);
                    return Result.Ok(user.Adapt<TModel>());
                }
            }
            return HandleResult(result);
        }

        public async Task<Result> ResetPasswordAsync(string email, string password, string token)
        {
            var user = await userManager.FindByEmailAsync(email);
            if (user is null)
                return Result.Fail(Errors.NotFound);
            var result = await userManager.ResetPasswordAsync(user, token, password);
            return HandleResult(result);
        }

        public async Task<T?> GetUser<T>(ClaimsPrincipal principal) where T : UserModel
        {
            var user = await userManager.GetUserAsync(principal);
            return user?.Adapt<T>();
        }
        public async Task<string?> GetRole(ClaimsPrincipal principal)
        {
            var user = await userManager.GetUserAsync(principal);
            IList<string> roles = await userManager.GetRolesAsync(user!);
            return roles.FirstOrDefault();
        }

        public async Task<bool> CheckPassword(ClaimsPrincipal principal)
        {
            var user = await userManager.GetUserAsync(principal);
            return user?.PasswordHash is not null;
        }

        private static async Task InitializeAsync(UserManager<User> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration)
        {
            string AdminEmail = configuration["Admin:Email"]!;
            string AdminPassword = configuration["Admin:Password"]!;
            if (await roleManager.FindByNameAsync(Roles.Admin) is null)
                await roleManager.CreateAsync(new IdentityRole(Roles.Admin));

            if (await roleManager.FindByNameAsync(Roles.Customer) is null)
                await roleManager.CreateAsync(new IdentityRole(Roles.Customer));

            if (await roleManager.FindByNameAsync(Roles.Employee) is null)
                await roleManager.CreateAsync(new IdentityRole(Roles.Employee));

            if (await userManager.FindByEmailAsync(AdminEmail) is null)
            {
                var admin = new User { Email = AdminEmail, UserName = AdminEmail, Name = Roles.Admin };
                var result = await userManager.CreateAsync(admin, AdminPassword);
                if (result.Succeeded)
                {
                    await userManager.ConfirmEmailAsync(admin, await userManager.GenerateEmailConfirmationTokenAsync(admin));
                    await userManager.AddToRoleAsync(admin, Roles.Admin);
                }
            }
        }
    }
}
