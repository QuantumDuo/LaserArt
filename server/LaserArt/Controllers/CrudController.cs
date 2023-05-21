using API.Requests;
using Mapster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;
using Services.Models;
using System.ComponentModel.DataAnnotations;

namespace API.Controllers
{
    [ApiController]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [Route(Routes.CrudRoute)]
    public abstract class CrudController<TModel, TRequest> : BaseController
        where TModel : EntityModel
        where TRequest : IRequestBody
    {
        protected readonly ICrudService<TModel> service;

        public CrudController(ICrudService<TModel> service) => this.service = service;

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async virtual Task<ActionResult<TModel>> AddAsync([FromForm] TRequest request)
        {
            var model = request.Adapt<TModel>();
            var result = await service.AddAsync(model);
            return HandleResult(result);
        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async virtual Task<IActionResult> EditAsync(int id, [FromForm] TRequest request)
        {
            var model = request.Adapt<TModel>();
            model.Id = id;
            var result = await service.EditAsync(model);
            return HandleResult(result);
        }

        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async virtual Task<IActionResult> DeleteAsync(int id)
        {
            var result = await service.DeleteAsync(id);
            return HandleResult(result);
        }
    }
}
