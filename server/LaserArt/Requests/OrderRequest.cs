using System.ComponentModel.DataAnnotations;

namespace API.Requests
{
    public class OrderRequest : IRequestBody
    {
        [Required]
        public DateTime Time { get; set; } = DateTime.Now;
        [Required]
        public int MaterialId { get; set; }
        [Required]
        public int Height { get; set; }
        [Required]
        public int Width { get; set; }
        [Required]
        public IFormFile File { get; set; } = null!;
    }
}
