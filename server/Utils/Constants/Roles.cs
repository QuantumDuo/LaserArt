namespace Utils.Constants
{
    public static class Roles
    {
        public const string Admin = nameof(Admin);
        public const string Customer = nameof(Customer);
        public const string Employee = nameof(Employee);
        public const string CustomerEmployee = $"{Customer},{Employee}";
    }
}
