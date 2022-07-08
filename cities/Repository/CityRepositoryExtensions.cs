using cities.Dtos.City;
using cities.Entities;
using Common.Repository;
using System.Linq.Dynamic.Core;

namespace cities.Repository
{
    public static class CityRepositoryExtensions
    {
        public static IQueryable<City> Search(this IQueryable<City> items,
            SearchCityRequestDto searchParams)
        {
            var itemsToReturn = items;

            if (string.IsNullOrWhiteSpace(searchParams.SearchText) == false)
            {
                itemsToReturn = itemsToReturn.Where(
                    x => (x.Name ?? "").ToLower().Contains(searchParams.SearchText)
                );
            }

            if (searchParams.StateId != null && searchParams.StateId != Guid.Empty)
            {
                itemsToReturn = itemsToReturn.Where(
                    x => x.StateId == searchParams.StateId);
            }

            if (searchParams.CityId != null && searchParams.CityId != Guid.Empty)
            {
                itemsToReturn = itemsToReturn.Where(
                    x => x.CityId == searchParams.CityId);
            }


            return itemsToReturn;
        }

        public static IQueryable<City> Sort(this IQueryable<City> items,
            string? orderBy)
        {
            if (string.IsNullOrWhiteSpace(orderBy))
                return items.OrderBy(e => e.Name);

            var orderQuery = OrderQueryBuilder.CreateOrderQuery<City>(orderBy);

            if (string.IsNullOrWhiteSpace(orderQuery))
                return items.OrderBy(e => e.Name);

            return items.OrderBy(orderQuery);
        }
    }
}
