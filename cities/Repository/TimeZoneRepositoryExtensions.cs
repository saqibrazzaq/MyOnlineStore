using cities.Dtos.TimeZone;
using Common.Repository;
using System.Linq.Dynamic.Core;

namespace cities.Repository
{
    public static class TimeZoneRepositoryExtensions
    {
        public static IQueryable<Entities.TimeZone> Search(this IQueryable<Entities.TimeZone> items,
            SearchTimeZoneRequestDto searchParams)
        {
            // Empty search term
            if (string.IsNullOrWhiteSpace(searchParams.SearchText))
                return items;

            // Convert to lower case
            var searchTerm = searchParams.SearchText.Trim().ToLower();

            // Search in different properties
            var itemsToReturn = items.Where(
                // Name
                x => (x.Name ?? "").ToLower().Contains(searchTerm) ||
                (x.Abbreviation ?? "").ToLower().Contains(searchTerm) ||
                (x.TimeZoneName ?? "").ToLower().Contains(searchTerm) ||
                (x.GmtOffsetName ?? "").ToLower().Contains(searchTerm)
                );

            return itemsToReturn;
        }

        public static IQueryable<Entities.TimeZone> Sort(this IQueryable<Entities.TimeZone> items,
            string? orderBy)
        {
            if (string.IsNullOrWhiteSpace(orderBy))
                return items.OrderBy(e => e.Name);

            var orderQuery = OrderQueryBuilder.CreateOrderQuery<Entities.TimeZone>(orderBy);

            if (string.IsNullOrWhiteSpace(orderQuery))
                return items.OrderBy(e => e.Name);

            return items.OrderBy(orderQuery);
        }
    }
}
