using FluentResults;
using Microsoft.AspNetCore.Identity;

namespace Services
{
    internal class Utils
    {
        public static Result HandleResult(IdentityResult result) => result.Succeeded
            ? Result.Ok()
            : Result.Fail(result.Errors.Select(e => e.Description));
    }
}
