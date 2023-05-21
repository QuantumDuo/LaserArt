using Services.Models.Register;

namespace API.Requests.Account.Register
{
    public class CustomerRegisterRequest : RegisterRequest
    {
        public override CustomerRegisterModel CreateModel() => CreateModel<CustomerRegisterModel>();
    }
}
