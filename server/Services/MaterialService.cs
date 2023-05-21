using DataAccess;
using DataAccess.Entities;
using DataAccess.Entities.Users;
using Microsoft.AspNetCore.Identity;
using Services.Interfaces;
using Services.Models;

namespace Services
{
    public class MaterialService : CrudService<MaterialModel, Material>, IMaterialService
    {
        public MaterialService(ApplicationContext context, UserManager<User> userManager) : base(context, userManager)
        {
        }

        public async Task<PagedArrayModel<MaterialModel>> GetAsync(int page, string query) => await GetAsync(page, x => x.Name.Contains(query), x => x.Name);
    }
}
