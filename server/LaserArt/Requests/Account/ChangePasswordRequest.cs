using System.ComponentModel.DataAnnotations;

namespace API.Requests.Account
{
    public class ChangePasswordRequest : AddPasswordRequest
    {
        [DataType(DataType.Password), Required]
        public string OldPassword { get; set; } = null!;
    }
}
