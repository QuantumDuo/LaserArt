using System.ComponentModel.DataAnnotations;

namespace API.Requests
{
	public class MaterialRequest : IRequestBody
	{
		[Required]
		public string Name { get; set; } = null!;
		[Required]
		public string LaserType { get; set; } = null!;
		[Required]
		public int Power { get; set; }
		[Required]
		public int Height { get; set; }
		[Required]
		public int Width { get; set; }

		[Required]
		public string EmployeeId { get; set; } = null!;
	}
}
