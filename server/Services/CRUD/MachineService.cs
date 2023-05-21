using DataAccess;
using DataAccess.Entities;
using DataAccess.Entities.Users;
using Microsoft.AspNetCore.Identity;
using Services.Interfaces;
using Services.Models;
using System.Linq.Expressions;
using System.Security.Claims;

namespace Services.CRUD
{
    public class MachineService : CrudService<MachineModel, Machine>, IMachineService
    {
        private readonly UserManager<User> userManager;
        public MachineService(ApplicationContext context, UserManager<User> userManager) : base(context) => this.userManager = userManager;

        public async Task<List<MachineModel>> GetAsync(ClaimsPrincipal principal)
        {
            var user = await userManager.GetUserAsync(principal);
            return await GetAsync(x => x.EmployeeId == user!.Id);
        }
    }
}
