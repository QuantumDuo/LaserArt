using FluentResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Utils.Constants;

namespace API.Controllers
{
    public abstract class BaseController : ControllerBase
    {
        protected ActionResult<T> HandleResult<T>(Result<T> result) => result.IsSuccess ? result.ValueOrDefault : Error(result);
        protected ActionResult<T> HandleCreatedResult<T>(Result<T> result) => result.IsSuccess ? Created(result.ValueOrDefault) : Error(result);
        protected ActionResult HandleResult(Result result) => result.IsSuccess ? Ok() : Error(result);
        private ActionResult Error(ResultBase result)
        {
            var errors = result.Errors.SelectMany(e => e.Reasons);
            return result.Errors[0].Message switch
            {
                Errors.NotFound => NotFound(errors),
                Errors.Forbidden => Forbid(errors),
                _ => BadRequest(errors)
            };
        }
        protected ActionResult<T> Created<T>(T value) => CreatedAtAction(null, value);
        protected ActionResult BadRequest(IEnumerable<IError> errors) => Error(errors, StatusCodes.Status400BadRequest);
        protected ActionResult Forbid(IEnumerable<IError> errors) => Error(errors, StatusCodes.Status403Forbidden);
        protected ActionResult NotFound(IEnumerable<IError> errors) => Error(errors, StatusCodes.Status404NotFound);
        private ActionResult Error(IEnumerable<IError> errors, int statusCode)
        {
            ModelStateDictionary pairs = new();
            foreach (var error in errors)
                pairs.AddModelError(Errors.Common, error.Message);
            return ValidationProblem(statusCode: statusCode, modelStateDictionary: pairs);
        }
    }
}
