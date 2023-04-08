using DataAccess;
using DataAccess.Entities;
using Services.Interfaces.CRUD;
using Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.CRUD
{
    public class MaterialService : CrudService<MaterialModel, Material>, IMaterialService
    {
        public MaterialService(ApplicationContext context) : base(context) { }

        public async Task<List<MaterialModel>> GetAsync() => await GetAsync(x => true);
        public async Task<MaterialModel?> GetAsync(int id)
        {
            var list = await GetAsync(x => x.Id == id);
            return list.FirstOrDefault();
        }
    }
}
