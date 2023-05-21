using DataAccess;
using DataAccess.Entities.Users;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Services;
using Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;
var configuration = builder.Configuration;
var logging = builder.Logging;

var connectionString = configuration.GetConnectionString("DefaultConnection");
services.AddDbContext<ApplicationContext>(options => options.UseSqlServer(connectionString));

Action<IdentityOptions> setupAction = options =>
{
    options.Password.RequireNonAlphanumeric = false;
    options.SignIn.RequireConfirmedEmail = true;
};
services.AddIdentity<User, IdentityRole>(setupAction)
        .AddEntityFrameworkStores<ApplicationContext>()
        .AddDefaultTokenProviders();

services.AddAuthentication()
        .AddCookie(CookieAuthenticationDefaults.AuthenticationScheme);

services.ConfigureApplicationCookie(options =>
{
    options.Events.OnRedirectToLogin = context =>
    {
        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
        return Task.CompletedTask;
    };
    options.Events.OnRedirectToAccessDenied = context =>
    {
        context.Response.StatusCode = StatusCodes.Status403Forbidden;
        return Task.CompletedTask;
    };
});

services.AddEndpointsApiExplorer()
        .AddSwaggerGen()
        .AddTransient<IEmailSender, EmailSender>()
        .AddScoped<IUserService, UserService>()
        .AddScoped<IMachineService, MachineService>()
        .AddScoped<IMaterialService, MaterialService>()
        .AddScoped<IOrderService, OrderService>()
        .AddProblemDetails()
        .AddControllersWithViews();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseExceptionHandler()
   .UseHttpsRedirection()
   .UseAuthentication()
   .UseAuthorization()
   .UseCors(builder => builder.WithOrigins("http://localhost:3000")
                              .AllowAnyHeader()
                              .AllowAnyMethod()
                              .AllowCredentials());

app.MapControllers();

app.Run();