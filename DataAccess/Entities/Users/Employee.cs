namespace DataAccess.Entities.Users
{
    public class Employee : User
    {
        public List<Order> Orders { get; set; } = null!;
        public int? MachineId { get; set; }
        public Machine? Machine { get; set; }
    }
}
