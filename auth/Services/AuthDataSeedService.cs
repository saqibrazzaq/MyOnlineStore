using auth.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Common.Utility;

namespace auth.Services
{
    public class AuthDataSeedService : IAuthDataSeedService
    {
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<AppIdentityUser> _userManager;
        private readonly IConfiguration _configuration;

        public AuthDataSeedService(
            RoleManager<IdentityRole> roleManager,
            UserManager<AppIdentityUser> userManager,
            IConfiguration configuration)
        {
            _roleManager = roleManager;
            _userManager = userManager;
            _configuration = configuration;
        }

        public async Task AddDefaultRolesAndUsers()
        {
            // Default roles which should exist
            var roleNames = Constants.AllRoles.Split(',');
            foreach (var roleName in roleNames)
            {
                // Add role, if it does not already exist
                var roleEntity = await _roleManager.FindByNameAsync(roleName);
                if (roleEntity == null)
                    await _roleManager.CreateAsync(new IdentityRole(roleName));
            }
        }
    }
}
