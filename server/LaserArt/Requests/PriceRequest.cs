using System.ComponentModel.DataAnnotations;

namespace API.Requests
{
    public class PriceRequest : IRequestBody
    {
        [Required]
        public int MaterialId { get; set; }
        [Required]
        public int Height { get; set; }
        [Required]
        public int Width { get; set; }
    }
}
