using Utils.Constants;

namespace DataAccess.Entities
{
    public class Material : Entity
    {
        public string Name { get; set; } = null!;
        public decimal Price { get; set; }

        public virtual List<Order> Orders { get; set; } = null!;

    }
}
