using API.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;
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
        public async Task<ActionResult<PagedArrayModel<MaterialModel>>> GetAsync(int page = 1, string query = "")
        {
            var materialService = service as IMaterialService;
            return await materialService!.GetAsync(page, query);
        }
    }
}