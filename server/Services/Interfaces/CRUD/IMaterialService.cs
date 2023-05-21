using Services.Models;

namespace Services.Interfaces.CRUD
{
    public interface IMaterialService : ICrudService<MaterialModel>
    {
        public Task<List<MaterialModel>> GetAsync();
        public Task<MaterialModel?> GetAsync(int id);
    }
}
