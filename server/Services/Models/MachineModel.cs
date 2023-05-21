namespace Services.Models
{
    public class MachineModel : EntityModel
    {
        public string Name { get; set; } = null!;
        public string LaserType { get; set; } = null!;
        public int Power { get; set; }
        public int Height { get; set; }
        public int Width { get; set; }

        public string? EmployeeId { get; set; }
        public EmployeeModel? Employee { get; set; }
    }
}
