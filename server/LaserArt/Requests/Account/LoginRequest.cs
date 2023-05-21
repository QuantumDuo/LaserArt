using FluentResults;
using System.ComponentModel.DataAnnotations;

namespace API.Requests.Account
{
    public class LoginRequest
    {
        [Required]
        public string Email { get; set; } = null!;

        [Required, DataType(DataType.Password)]
        public string Password { get; set; } = null!;
    }
}
