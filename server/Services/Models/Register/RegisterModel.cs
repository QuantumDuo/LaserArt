using DataAccess.Entities.Users;

namespace Services.Models.Register
{
    public abstract class RegisterModel
    {
        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string UserName => Email;
        public string Password { get; set; } = null!;
        public abstract User Create();
        public abstract string GetRole();
    }
}
