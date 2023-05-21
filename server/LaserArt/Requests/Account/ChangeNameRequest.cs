using System.ComponentModel.DataAnnotations;

namespace API.Requests.Account
{
    public class ChangeNameRequest
    {
        [Required]
        public string Name { get; set; } = null!;
    }
}
