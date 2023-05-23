using DataAccess;
using DataAccess.Entities;
using DataAccess.Entities.Users;
using FluentResults;
using IronPython.Hosting;
using Mapster;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Scripting.Hosting;
using Services.Interfaces;
using Services.Models;
using System;
using System.Linq.Expressions;
using System.Security.Claims;
using Utils.Constants;

namespace Services
{
    public class OrderService : CrudService<OrderModel, Order>, IOrderService
    {
        private readonly IMaterialService materialService;
        private readonly IConfiguration configuration;
        public OrderService(ApplicationContext context, UserManager<User> userManager, IConfiguration configuration, IMaterialService materialService) 
            : base(context, userManager)
        {
            this.configuration = configuration;
            this.materialService = materialService;
        }

        public async Task<PagedArrayModel<OrderModel>> GetAsync(ClaimsPrincipal principal, int page)
        {
            var user = await userManager.GetUserAsync(principal);
            Expression<Func<Order, bool>> predicate = user switch
            {
                Employee employee => x => x.EmployeeId == employee.Id,
                null => throw new NullReferenceException(),
                _ => x => x.CustomerId == user.Id,
            };
            return await GetAsync(page, predicate, x => x.Time, true);
        }

        public async Task<PagedArrayModel<OrderModel>> GetUnacceptedAsync(int page) =>
            await GetAsync(page, x => x.Status == "Unaccepted", x => x.Time, true);

        public async Task<Result<decimal>> GetPriceAsync(OrderModel model)
        {
            var price = decimal.Parse(configuration["Price"]!);
            var material = await materialService.GetByIdAsync(model.MaterialId);
            if (material is null)
                return Result.Fail(Errors.NotFound);
            return (material.Price + price) * model.Width * model.Height;
        }

        public override async Task<Result<OrderModel>> AddAsync(OrderModel model)
        {
            var material = await materialService.GetByIdAsync(model.MaterialId);
            if (material is null)
                return Result.Fail(Errors.NotFound);
            var price = decimal.Parse(configuration["Price"]!);
            model.Status = "Unaccepted";
            model.Price = (material.Price + price) * model.Width * model.Height; ;
            var entity = model.Adapt<Order>();
            await context.AddAsync(entity);
            await context.SaveChangesAsync();
            var response = entity.Adapt<OrderModel>();
            return Result.Ok(response);
        }

        public async Task<Result> AcceptAsync(ClaimsPrincipal principal, int id)
        {
            var order = await context.Orders.FindAsync(id);
            if (order is null)
                return Result.Fail(Errors.NotFound);
            order.EmployeeId = userManager.GetUserId(principal);
            order.Status = "Accepted";
            context.Update(order);
            await context.SaveChangesAsync();
            return Result.Ok();
        }
        public async Task<Result> DoAsync(ClaimsPrincipal principal, int id)
        {
            var order = await context.Orders.FindAsync(id);
            if (order is null)
                return Result.Fail(Errors.NotFound);
            if (order.EmployeeId != userManager.GetUserId(principal))
                return Result.Fail(Errors.Forbidden);
            order.Status = "Done";
            context.Update(order);
            await context.SaveChangesAsync();
            return Result.Ok();
        }
    }
}
