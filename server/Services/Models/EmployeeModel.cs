namespace Services.Models
{
    public class EmployeeModel : UserModel
    {
        public int MachineId { get; set; }
        public MachineModel? Machine { get; set; }
    }
}
