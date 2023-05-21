using Services.Models;
using System.Security.Claims;

namespace Services.Interfaces
{
    public interface IMachineService : ICrudService<MachineModel>
    {
        Task<PagedArrayModel<MachineModel>> GetAsync(ClaimsPrincipal principal, int page, string query);
    }
}
