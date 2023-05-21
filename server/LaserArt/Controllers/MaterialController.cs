using API.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces.CRUD;
using Services.Models;
using Utils.Constants;

namespace API.Controllers
{
    [Authorize(Roles = Roles.Admin)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public class MaterialController : CrudController<MaterialModel, MaterialRequest>
    {
        public MaterialController(IMaterialService service) : base(service) { }

        [HttpGet]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<List<MaterialModel>>> GetAsync()
        {
            var materialService = service as IMaterialService;
            return await materialService!.GetAsync();
        }
    }
}