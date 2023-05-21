using Services.Interfaces.CRUD;
using Services.Models;
using System.Security.Claims;

namespace Services.Interfaces
{
    public interface IMachineService : ICrudService<MachineModel>
    {
        public Task<List<MachineModel>> GetAsync(ClaimsPrincipal principal);
    }
}
