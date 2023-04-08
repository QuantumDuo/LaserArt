using Microsoft.AspNetCore.Identity;

namespace DataAccess.Entities.Users
{
    public class User : IdentityUser
    {
        public string Avatar { get; set; } = string.Empty;
        public string Name { get; set; } = null!;
    }
}
