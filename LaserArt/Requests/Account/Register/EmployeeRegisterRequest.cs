using Services.Models.Register;
using System.ComponentModel.DataAnnotations;

namespace API.Requests.Account.Register
{
    public class EmployeeRegisterRequest : RegisterRequest
    {
        [Required]
        public int CateringId { get; set; }
        public override EmployeeRegisterModel CreateModel() => CreateModel<EmployeeRegisterModel>();
    }
}
