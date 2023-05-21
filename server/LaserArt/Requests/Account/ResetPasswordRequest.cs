using System.ComponentModel.DataAnnotations;
using Utils.Constants;

namespace API.Requests.Account
{
    public class ResetPasswordRequest
    {
        [EmailAddress, Required]
        public string Email { get; set; } = null!;

        [DataType(DataType.Password), Required]
        public string Password { get; set; } = null!;

        [DataType(DataType.Password), Required, Compare(nameof(Password), ErrorMessage = Errors.PasswordAreNotTheSame)]
        public string ConfirmPassword { get; set; } = null!;

        [Required]
        public string Code { get; set; } = null!;
    }
}
