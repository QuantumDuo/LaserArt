namespace Services.Models
{
    public record PagedArrayModel<TModel>(List<TModel> Items, int TotalCount);
}
