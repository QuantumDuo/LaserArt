using FluentResults;
using Services.Models;
using System.Security.Claims;

namespace Services.Interfaces
{
    public interface ICrudService<TModel> where TModel : class
    {
        Task<Result<TModel>> AddAsync(TModel model);
        Task<Result> DeleteAsync(int id);
        Task<Result> EditAsync(TModel model);
        Task<TModel?> GetByIdAsync(int id);
    }
}
