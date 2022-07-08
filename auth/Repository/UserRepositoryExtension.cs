using auth.Dtos.User;
using auth.Entities;
using Common.Repository;
using System.Linq.Dynamic.Core;

namespace auth.Repository
{
    public static class UserRepositoryExtension
    {
        public static IQueryable<AppIdentityUser> Search(this IQueryable<AppIdentityUser> users,
            SearchUsersRequestDto dto)
        {
            // Empty search term
            if (string.IsNullOrWhiteSpace(dto.SearchText))
                return users;

            // Convert to lower case
            var searchTerm = dto.SearchText.Trim().ToLower();

            // Search in different properties
            var usersToReturn = users.Where(
                // Name
                x => (x.UserName ?? "").ToLower().Contains(searchTerm) ||
                (x.Email ?? "").ToLower().Contains(searchTerm)
                );

            return usersToReturn;
        }

        public static IQueryable<AppIdentityUser> Sort(this IQueryable<AppIdentityUser> users,
            string? orderBy)
        {
            if (string.IsNullOrWhiteSpace(orderBy))
                return users.OrderBy(e => e.UserName);

            var orderQuery = OrderQueryBuilder.CreateOrderQuery<AppIdentityUser>(orderBy);

            if (string.IsNullOrWhiteSpace(orderQuery))
                return users.OrderBy(e => e.UserName);

            return users.OrderBy(orderQuery);
        }
    }
}
