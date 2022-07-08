using cities.Dtos.State;
using cities.Entities;
using Common.Repository;
using System.Linq.Dynamic.Core;

namespace cities.Repository
{
    public static class StateRepositoryExtensions
    {
        public static IQueryable<State> Search(this IQueryable<State> items,
            SearchStateRequestDto searchParams)
        {
            // Convert to lower case
            var searchTerm = searchParams?.SearchText?.Trim().ToLower();

            var itemsToReturn = items;

            // Search in different properties
            if (string.IsNullOrWhiteSpace(searchTerm) == false)
            {
                itemsToReturn = itemsToReturn.Where(
                // Name
                x => (x.Name ?? "").ToLower().Contains(searchTerm) ||
                (x.StateCode ?? "").ToLower().Contains(searchTerm)
                );
            }

            if (searchParams?.CountryId != null && searchParams.CountryId != Guid.Empty)
            {
                itemsToReturn = itemsToReturn.Where(
                    x => x.CountryId == searchParams.CountryId);
            }

            if (searchParams?.StateId != null && searchParams.StateId != Guid.Empty)
            {
                itemsToReturn = itemsToReturn.Where(
                    x => x.StateId == searchParams.StateId);
            }

            return itemsToReturn;
        }

        public static IQueryable<State> Sort(this IQueryable<State> items,
            string? orderBy)
        {
            if (string.IsNullOrWhiteSpace(orderBy))
                return items.OrderBy(e => e.Name);

            var orderQuery = OrderQueryBuilder.CreateOrderQuery<State>(orderBy);

            if (string.IsNullOrWhiteSpace(orderQuery))
                return items.OrderBy(e => e.Name);

            return items.OrderBy(orderQuery);
        }
    }
}
