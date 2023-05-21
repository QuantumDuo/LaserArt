using DataAccess.Entities.Users;
using Mapster;
using Utils.Constants;

namespace Services.Models.Register
{
    public class CustomerRegisterModel : RegisterModel
    {
        public override Customer Create() => this.Adapt<Customer>();

        public override string GetRole() => Roles.Customer;
    }
}
