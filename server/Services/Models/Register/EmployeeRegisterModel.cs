using DataAccess.Entities.Users;
using Mapster;
using Utils.Constants;

namespace Services.Models.Register
{
    public class EmployeeRegisterModel : RegisterModel
    {
        public int CateringId { get; set; }
        public override Employee Create() => this.Adapt<Employee>();
        public override string GetRole() => Roles.Employee;
    }
}
