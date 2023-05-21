using DataAccess;
using DataAccess.Entities;
using FluentResults;
using Mapster;
using Microsoft.EntityFrameworkCore;
using Services.Interfaces.CRUD;
using Services.Models;
using System.Linq.Expressions;
using Utils.Constants;

namespace Services.CRUD
{
    public abstract class CrudService<TModel, TEntity> : ICrudService<TModel> where TModel : EntityModel where TEntity : Entity
    {
        protected readonly ApplicationContext context;

        public CrudService(ApplicationContext context) => this.context = context;
        public virtual async Task<List<TModel>> GetAsync(Expression<Func<TEntity, bool>> predicate)
        {
            var entities = await context.Set<TEntity>().Where(predicate).ToListAsync();
            return entities.Adapt<List<TModel>>();
        }
        public virtual async Task<Result<TModel>> AddAsync(TModel model)
        {
            var entity = model.Adapt<TModel>();
            await context.AddAsync(entity);
            await context.SaveChangesAsync();
            var response = entity.Adapt<TModel>();
            return Result.Ok(response);
        }

        public virtual async Task<Result> DeleteAsync(int id)
        {
            var entity = await context.FindAsync<TEntity>(id);
            if (entity is null)
                return Result.Fail(Errors.NotFound);
            context.Remove(entity);
            await context.SaveChangesAsync();
            return Result.Ok();
        }

        public virtual async Task<Result> EditAsync(TModel model)
        {
            var entity = await context.FindAsync<TEntity>(model.Id);
            if (entity is null)
                return Result.Fail(Errors.NotFound);
            entity = model.Adapt<TEntity>();
            context.Update(entity);
            await context.SaveChangesAsync();
            return Result.Ok();
        }
    }
}
