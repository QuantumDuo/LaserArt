using System.ComponentModel.DataAnnotations;

namespace API.Requests.Account
{
    public class ForgotPasswordRequest
    {
        [EmailAddress, Required]
        public string Email { get; set; } = null!;
    }
}
