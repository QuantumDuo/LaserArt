using System.ComponentModel.DataAnnotations;

namespace API.Requests
{
    public class MachineRequest : IRequestBody
    {
        [Required]
        public string Name { get; set; } = null!;
        [Required]
        public decimal Price { get; set; }
    }
}
