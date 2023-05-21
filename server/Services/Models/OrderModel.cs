namespace Services.Models
{
    public class OrderModel : EntityModel
    {
        public decimal Price { get; set; }
        public string Status { get; set; } = null!;
        public DateTime Time { get; set; }
        public int Height { get; set; }
        public int Width { get; set; }

        public int MaterialId { get; set; }
        public MaterialModel Material { get; set; } = null!;

        public string CustomerId { get; set; } = null!;
        public UserModel? Customer { get; set; }

        public string? EmployeeId { get; set; }
        public EmployeeModel? Employee { get; set; }
    }
}
