namespace DataAccess.Entities.Users
{
    public class Employee : User
    {
        public virtual List<Order> Orders { get; set; } = null!;
        public int? MachineId { get; set; }
        public virtual Machine? Machine { get; set; }
    }
}
