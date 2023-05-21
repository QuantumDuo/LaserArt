namespace DataAccess.Entities
{
    public class Material : Entity
    {
        public string Name { get; set; } = null!;
        public decimal Price { get; set; }

        public List<Order> Orders { get; set; } = null!;
    }
}
