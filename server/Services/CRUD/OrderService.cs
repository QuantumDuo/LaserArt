using DataAccess;
using DataAccess.Entities;
using DataAccess.Entities.Users;
using FluentResults;
using Mapster;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Services.Interfaces.CRUD;
using Services.Models;
using System.Linq.Expressions;
using System.Security.Claims;
using Utils.Constants;

namespace Services.CRUD
{
    public class OrderService : CrudService<OrderModel, Order>, IOrderService
    {
        private readonly UserManager<User> userManager;
        private readonly IMaterialService materialService;
        private readonly IConfiguration configuration;
        public OrderService(ApplicationContext context, UserManager<User> userManager, IConfiguration configuration, IMaterialService materialService) : base(context)
        {
            this.userManager = userManager;
            this.configuration = configuration;
            this.materialService = materialService;
        }

        public async Task<List<OrderModel>> GetAsync(ClaimsPrincipal principal)
        {
            var user = await userManager.GetUserAsync(principal);
            Expression<Func<Order, bool>> predicate = user switch
            {
                Employee employee => x => x.EmployeeId == employee.Id,
                null => throw new NullReferenceException(),
                _ => x => x.CustomerId == user.Id,
            };
            return await GetAsync(predicate);
        }

        public decimal GetPrice(OrderModel model)
        {
            var price = decimal.Parse(configuration["Price"]!);
            return (model.Material.Price + price) * model.Width * model.Height;
        }

        public override async Task<Result<OrderModel>> AddAsync(OrderModel model)
        {
            var material = await materialService.GetAsync(model.MaterialId);
            if (material is null)
                return Result.Fail(Errors.NotFound);
            model.Material = material;
            model.Price = GetPrice(model);
            var entity = model.Adapt<Order>();
            await context.AddAsync(entity);
            await context.SaveChangesAsync();
            var response = entity.Adapt<OrderModel>();
            return Result.Ok(response);
        }

        public async Task<Result> AcceptAsync(int id)
        {
            var order = await context.Orders.FindAsync(id);
            if(order is null)
                return Result.Fail(Errors.NotFound);
            order.Status = "Accepted";
            context.Update(order);
            await context.SaveChangesAsync();
            return Result.Ok();
        }
    }
}
