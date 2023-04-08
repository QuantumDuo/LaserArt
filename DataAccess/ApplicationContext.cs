using DataAccess.Entities;
using DataAccess.Entities.Users;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;

namespace DataAccess
{
    public class ApplicationContext : IdentityDbContext<User>
    {
        public DbSet<Customer> Customers { get; set; } = null!;
        public DbSet<Employee> Employees { get; set; } = null!;
        public DbSet<Order> Orders { get; set; } = null!;
        public DbSet<Machine> Machines { get; set; } = null!;

        private const string CONNECTION_STRING = "Server=GUREN;Database=LaserArt;Trusted_Connection=True;Trust Server Certificate=true";
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
            Database.EnsureDeleted();
            Database.EnsureCreated();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) => optionsBuilder.UseSqlServer(CONNECTION_STRING);

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<User>()
                   .UseTptMappingStrategy();

            builder.Entity<User>()
                   .HasData(new User { Id = "0", Name = "Deleted user" });

            //builder.Entity<Dish>()
            //       .Property(e => e.Tags)
            //       .HasConversion(v => string.Join('|', v),
            //                      v => v.Split('|', StringSplitOptions.RemoveEmptyEntries).ToList());

            base.OnModelCreating(builder);
        }
    }
}
