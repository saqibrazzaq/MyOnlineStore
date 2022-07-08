using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace auth.Services
{
    public interface IAuthDataSeedService
    {
        Task AddDefaultRolesAndUsers();
    }
}
