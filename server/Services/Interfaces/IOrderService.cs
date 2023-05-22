using FluentResults;
using Services.Models;
using System.Security.Claims;

namespace Services.Interfaces
{
    public interface IOrderService : ICrudService<OrderModel>
    {
        Task<PagedArrayModel<OrderModel>> GetAsync(ClaimsPrincipal principal, int page);
        decimal GetPrice(OrderModel model);
        Task<Result> AcceptAsync(int id);
        Task<Result> DoAsync(int id);
    }
}
