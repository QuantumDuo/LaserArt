using FluentResults;
using Services.Models;
using Services.Models.Register;
using System.Security.Claims;

namespace Services.Interfaces
{
    public interface IUserService
    {
        public Task<Result<T>> RegisterAsync<T>(RegisterModel model, string callbackUrl) where T : UserModel;
        public Task<Result> LoginAsync(string email, string password);
        public Task<Result> DeleteAsync(ClaimsPrincipal principal);
        public Task<Result> ForgotPasswordAsync(string email, string callbackUrl);
        public Task<Result> ResetPasswordAsync(string email, string password, string token);
        public Task<Result> ConfirmEmailAsync(string id, string code);
        public Task LogoutAsync();
        public Task<Result> ChangePasswordAsync(string oldPassword, string newPassword, ClaimsPrincipal principal);
        public Task<Result> AddPasswordAsync(string password, ClaimsPrincipal principal);
        public Task<Result> ChangeNameAsync(string name, ClaimsPrincipal principal);
        public Task<T?> GetUser<T>(ClaimsPrincipal principal) where T : UserModel;
        public Task<string?> GetRole(ClaimsPrincipal principal);
        public Task<bool> CheckPassword(ClaimsPrincipal principal);
    }
}
