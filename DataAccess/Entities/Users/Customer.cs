namespace DataAccess.Entities.Users
{
    public class Customer : User
    {
        public List<Order> Orders { get; set; } = null!;
    }
}
