using DataAccess.Entities;
using DataAccess.Entities.Users;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DataAccess
{
    public class ApplicationContext : IdentityDbContext<User>
    {
        public DbSet<Customer> Customers { get; set; } = null!;
        public DbSet<Employee> Employees { get; set; } = null!;
        public DbSet<Order> Orders { get; set; } = null!;
        public DbSet<Machine> Machines { get; set; } = null!;

        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options) => Database.EnsureCreated();

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) => optionsBuilder.UseLazyLoadingProxies();

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<User>()
                   .UseTptMappingStrategy();

            builder.Entity<User>()
                   .HasData(new User { Id = "0", Name = "Deleted user" });

            builder.Entity<Employee>()
                   .OwnsOne(e => e.Machine);

            builder.Entity<Order>()
                   .HasOne(o => o.Employee)
                   .WithMany(e => e.Orders)
                   .OnDelete(DeleteBehavior.NoAction);

            builder.Entity<Order>()
                   .HasOne(o => o.Customer)
                   .WithMany(e => e.Orders)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Order>()
                   .HasOne(o => o.Material)
                   .WithMany(m => m.Orders)
                   .OnDelete(DeleteBehavior.Restrict);

            base.OnModelCreating(builder);
        }
    }
}
