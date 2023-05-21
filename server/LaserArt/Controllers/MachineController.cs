using API.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;
using Services.Models;
using Utils.Constants;

namespace API.Controllers
{
    [Authorize(Roles = Roles.Employee)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public class MachineController : CrudController<MachineModel, MachineRequest>
    {
        public MachineController(IMachineService service) : base(service) { }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<PagedArrayModel<MachineModel>>> GetAsync(int page = 1, string query = "")
        {
            var machineService = service as IMachineService;
            return await machineService!.GetAsync(User, page, query);
        }
    }
}