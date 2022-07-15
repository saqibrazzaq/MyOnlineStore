using Common.Repository;
using hr.Dtos.Designation;
using hr.Entities;
using System.Linq.Dynamic.Core;

namespace hr.Repository
{
    public static class DesignationRepositoryExtensions
    {
        public static IQueryable<Designation> Search(this IQueryable<Designation> items,
            SearchDesignationRequestDto searchParams)
        {
            var itemsToReturn = items
                .Where(x => x.AccountId == searchParams.AccountId);

            if (string.IsNullOrWhiteSpace(searchParams.SearchText) == false)
            {
                itemsToReturn = itemsToReturn.Where(
                    x => (x.Name ?? "").ToLower().Contains(searchParams.SearchText)
                );
            }

            return itemsToReturn;
        }

        public static IQueryable<Designation> Sort(this IQueryable<Designation> items,
            string? orderBy)
        {
            if (string.IsNullOrWhiteSpace(orderBy))
                return items.OrderBy(e => e.Name);

            var orderQuery = OrderQueryBuilder.CreateOrderQuery<Designation>(orderBy);

            if (string.IsNullOrWhiteSpace(orderQuery))
                return items.OrderBy(e => e.Name);

            return items.OrderBy(orderQuery);
        }
    }
}
