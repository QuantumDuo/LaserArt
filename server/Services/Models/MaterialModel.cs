namespace Services.Models
{
    public class MaterialModel : EntityModel
    {
        public string Name { get; set; } = null!;
        public decimal Price { get; set; }
    }
}
