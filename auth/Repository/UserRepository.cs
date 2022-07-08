using auth.Data;
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
    public class UserRepository : AuthRepositoryBase<AppIdentityUser>, IUserRepository
    {
        public UserRepository(AuthDbContext context) : base(context)
        {
        }

        public PagedList<AppIdentityUser> SearchUsers(
            SearchUsersRequestDto userParameters, bool trackChanges)
        {
            // Find users
            var users = FindAll(trackChanges)
                .Search(userParameters)
                .Sort(userParameters.OrderBy)
                .Skip((userParameters.PageNumber - 1) * userParameters.PageSize)
                .Take(userParameters.PageSize)
                .ToList();
            // Get count by using the same search parameters
            var count = FindAll(trackChanges)
                .Search(userParameters)
                .Count();
            return new PagedList<AppIdentityUser>(users, count, userParameters.PageNumber,
                userParameters.PageSize);
        }
    }
}
