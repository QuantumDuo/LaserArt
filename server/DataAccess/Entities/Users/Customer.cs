namespace DataAccess.Entities.Users
{
    public class Customer : User
    {
        public virtual List<Order> Orders { get; set; } = null!;
    }
}
