using FluentResults;
using Services.Models;
using System.Security.Claims;

namespace Services.Interfaces
{
    public interface IOrderService : ICrudService<OrderModel>
    {
        Task<PagedArrayModel<OrderModel>> GetAsync(ClaimsPrincipal principal, int page);
        decimal GetPrice(OrderModel model);
        Task<Result> AcceptAsync(ClaimsPrincipal principal, int id);
        Task<Result> DoAsync(ClaimsPrincipal principal, int id);
        Task<PagedArrayModel<OrderModel>> GetUnacceptedAsync(int page);
    }
}
