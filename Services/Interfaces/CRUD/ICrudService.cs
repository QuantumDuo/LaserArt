using FluentResults;
using Services.Models;

namespace Services.Interfaces.CRUD
{
    public interface ICrudService<TModel> where TModel : EntityModel
    {
        public Task<Result<TModel>> AddAsync(TModel model);
        public Task<Result> DeleteAsync(int id);
        public Task<Result> EditAsync(TModel model);
    }
}
