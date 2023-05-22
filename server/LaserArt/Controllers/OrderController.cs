using API.Requests;
using DataAccess.Entities.Users;
using Mapster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;
using Services.Models;
using Utils.Constants;

namespace API.Controllers
{
    [ApiController]
    [Route(Routes.CrudRoute)]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public class OrderController : BaseController
    {
        private readonly IOrderService orderService;
        private readonly UserManager<User> userManager;
        public OrderController(IOrderService orderService, UserManager<User> userManager)
        {
            this.orderService = orderService;
            this.userManager = userManager;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<PagedArrayModel<OrderModel>>> GetAsync(int page = 1) => await orderService.GetAsync(User, page);
        [HttpPost]
        [Authorize(Roles = Roles.Customer)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async virtual Task<ActionResult<OrderModel>> AddAsync([FromForm] OrderRequest request)
        {
            var model = request.Adapt<OrderModel>();
            if (Path.GetExtension(request.File.FileName).ToLower() != ".svg")
                return BadRequest(new string[] { "Invalid file. Should be SVG" });
            model.Path = $"Images/{Guid.NewGuid()}.svg";
            using (var stream = System.IO.File.Create(model.Path))
                await request.File.CopyToAsync(stream);
            model.CustomerId = userManager.GetUserId(User)!;
            var result = await orderService.AddAsync(model);
            return HandleCreatedResult(result);
        }

        [HttpDelete]
        [Authorize(Roles = Roles.Admin)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async virtual Task<IActionResult> DeleteAsync(int id)
        {
            var result = await orderService.DeleteAsync(id);
            return HandleResult(result);
        }

        [HttpGet(Routes.Action)]
        [Authorize(Roles = Roles.Customer)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<decimal> Price([FromForm] OrderRequest request)
        {
            var model = request.Adapt<OrderModel>();
            return orderService.GetPrice(model);
        }

        [HttpPatch(Routes.Action)]
        [Authorize(Roles = Roles.Employee)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<decimal>> AcceptAsync(int id)
        {
            var result = await orderService.AcceptAsync(id);
            return HandleResult(result);
        }

        [HttpPatch(Routes.Action)]
        [Authorize(Roles = Roles.Employee)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<decimal>> DoAsync(int id)
        {
            var result = await orderService.DoAsync(id);
            return HandleResult(result);
        }

        [Authorize]
        [HttpGet("[action]")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DocAsync(int id)
        {
            var file = await orderService.GetByIdAsync(id);
            if (file is null)
                return NotFound();
            byte[] fileBytes = System.IO.File.ReadAllBytes(file.Path);
            return File(fileBytes, System.Net.Mime.MediaTypeNames.Application.Octet, $"{file.Id}.svg");
        }

    }
}
