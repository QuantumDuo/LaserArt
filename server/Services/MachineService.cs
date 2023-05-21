using DataAccess;
using DataAccess.Entities;
using DataAccess.Entities.Users;
using Microsoft.AspNetCore.Identity;
using Services.Interfaces;
using Services.Models;
using System.Linq.Expressions;
using System.Security.Claims;

namespace Services
{
    public class MachineService : CrudService<MachineModel, Machine>, IMachineService
    {
        public MachineService(ApplicationContext context, UserManager<User> userManager) : base(context, userManager)
        {
        }

        public async Task<PagedArrayModel<MachineModel>> GetAsync(ClaimsPrincipal principal, int page, string query)
        {
            var user = await userManager.GetUserAsync(principal);
            return await GetAsync(page, x => x.EmployeeId == user!.Id && x.Name.Contains(query), x => x.Name);
        }
    }
}
