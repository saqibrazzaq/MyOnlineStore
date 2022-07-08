using auth.Dtos.User;
using auth.Entities;
using Common.Models.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace auth.Repository
{
    public interface IUserRepository
    {
        PagedList<AppIdentityUser> SearchUsers(
            SearchUsersRequestDto dto, bool trackChanges);
    }
}
