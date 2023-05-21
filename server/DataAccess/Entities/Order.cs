using DataAccess.Entities.Users;

namespace DataAccess.Entities
{
    public class Order : Entity
    {
        public string Status { get; set; } = null!;
        public DateTime Time { get; set; }
        public int Height { get; set; }
        public int Width { get; set; }
        public string Path { get; set; } = null!;
        public decimal Price { get; set; }

        public string CustomerId { get; set; } = null!;
        public virtual Customer Customer { get; set; } = null!;

        public int MaterialId { get; set; }
        public virtual Material Material { get; set; } = null!;

        public string? EmployeeId { get; set; }
        public virtual Employee? Employee { get; set; }

    }
}
