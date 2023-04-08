using System.ComponentModel.DataAnnotations;

namespace API.Requests
{
    public class OrderRequest : IRequestBody
    {
        [Required]
        public string Status { get; set; } = null!;
        [Required]
        public DateTime Time { get; set; } = DateTime.Now;
        [Required]
        public int MaterialId { get; set; }
        [Required]
        public int Height { get; set; }
        [Required]
        public int Width { get; set; }

        public string CustomerId { get; set; } = null!;
    }
}
