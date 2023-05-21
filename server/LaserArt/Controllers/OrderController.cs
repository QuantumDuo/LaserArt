using API.Requests;
using Mapster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Models;
using Utils.Constants;
using System.ComponentModel.DataAnnotations;
using Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using DataAccess.Entities.Users;

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
    }
}
