using Services.Models;

namespace Services.Interfaces
{
    public interface IMaterialService : ICrudService<MaterialModel>
    {
        Task<PagedArrayModel<MaterialModel>> GetAsync(int page);
    }
}
