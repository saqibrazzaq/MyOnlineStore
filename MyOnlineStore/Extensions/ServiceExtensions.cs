using auth.Data;
using auth.Entities;
using auth.Repository;
using auth.Services;
using cities.Data;
using cities.Repository;
using cities.Services;
using Common.ActionFilters;
using logger;
using mailer;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace MyOnlineStore.Extensions
{
    public static class ServiceExtensions
    {
        public static void ConfigureCors(this IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", builder =>
                {
                    builder
                    //.AllowAnyOrigin()
                    .WithOrigins("https://localhost:3000")
                    .AllowCredentials()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
                });
            });
        }

        public static void ConfigureLoggerService(this IServiceCollection services)
        {
            services.AddSingleton<ILoggerManager, LoggerManager>();
        }

        public static void ConfigureRepositoryManager(this IServiceCollection services)
        {
            services.AddScoped<IAuthRepositoryManager, AuthRepositoryManager>();
            services.AddScoped<ICitiesRepositoryManager, CitiesRepositoryManager>();
        }

        public static void ConfigureAutoMapper(this IServiceCollection services)
        {
            services.AddAutoMapper(typeof(MappingProfile));
            services.AddAutoMapper(typeof(cities.MappingProfile));
        }

        public static void MigrateDatabase(this IServiceCollection services)
        {
            var authContext = services.BuildServiceProvider().GetRequiredService<AuthDbContext>();
            authContext.Database.Migrate();

            var citiesContext = services.BuildServiceProvider().GetRequiredService<CitiesDbContext>();
            citiesContext.Database.Migrate();
        }

        public static void SeedDefaultData(this IServiceCollection services)
        {
            var authDataSeeder = services.BuildServiceProvider().GetRequiredService<IAuthDataSeedService>();
            authDataSeeder.Seed();

            var citiesDataSeeder = services.BuildServiceProvider().GetRequiredService<ICitiesDataSeedService>();
            citiesDataSeeder.Seed();
        }

        public static void ConfigureAuthServices(this IServiceCollection services)
        {
            services.AddHttpContextAccessor();

            services.AddScoped<IAuthDataSeedService, AuthDataSeedService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IEmailSender, EmailSender>();
        }

        public static void ConfigureCitiesServices(this IServiceCollection services)
        {
            services.AddScoped<ICitiesDataSeedService, CitiesDataSeedService>();
        }

        public static void ConfigureValidationFilter(this IServiceCollection services)
        {
            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.SuppressModelStateInvalidFilter = true;
            });

            services.AddScoped<ValidationFilterAttribute>();
        }

        public static void ConfigureSqlContext(this IServiceCollection services,
            IConfiguration configuration)
        {
            services.AddDbContext<AuthDbContext>(x => x.UseSqlServer(
                configuration.GetConnectionString("AuthDbConnection"),
                x => x.MigrationsAssembly("auth")));

            services.AddDbContext<CitiesDbContext>(x => x.UseSqlServer(
                configuration.GetConnectionString("CitiesDbConnection"),
                x => x.MigrationsAssembly("cities")));
        }

        public static void ConfigureIdentity(this IServiceCollection services)
        {
            services.AddIdentity<AppIdentityUser, IdentityRole>()
                .AddDefaultTokenProviders()
                .AddEntityFrameworkStores<AuthDbContext>();
        }

        public static void ConfigureJwt(this IServiceCollection services,
            IConfiguration configuration)
        {
            // Adding Authentication  
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })

            // Adding Jwt Bearer  
            .AddJwtBearer(options =>
            {
                options.SaveToken = true;
                options.RequireHttpsMetadata = false;
                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidAudience = configuration["JWT:ValidAudience"],
                    ValidIssuer = configuration["JWT:ValidIssuer"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                        configuration["JWT:Secret"]))
                };
            });
        }
    }
}
