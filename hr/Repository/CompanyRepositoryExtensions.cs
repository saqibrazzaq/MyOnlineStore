using Common.Repository;
using hr.Dtos.Company;
using hr.Entities;
using System.Linq.Dynamic.Core;

namespace hr.Repository
{
    public static class CompanyRepositoryExtensions
    {
        public static IQueryable<Company> Search(this IQueryable<Company> items,
            SearchCompaniesRequestDto searchParams)
        {
            var itemsToReturn = items.Where(x => x.AccountId == searchParams.AccountId);

            if (string.IsNullOrWhiteSpace(searchParams.SearchText) == false)
            {
                itemsToReturn = itemsToReturn.Where(
                    x => (x.Name ?? "").ToLower().Contains(searchParams.SearchText)
                );
            }

            if (searchParams.CompanyId != null && searchParams.CompanyId != Guid.Empty)
            {
                itemsToReturn = itemsToReturn.Where(
                    x => x.CompanyId == searchParams.CompanyId);
            }


            return itemsToReturn;
        }

        public static IQueryable<Company> Sort(this IQueryable<Company> items,
            string? orderBy)
        {
            if (string.IsNullOrWhiteSpace(orderBy))
                return items.OrderBy(e => e.Name);

            var orderQuery = OrderQueryBuilder.CreateOrderQuery<Company>(orderBy);

            if (string.IsNullOrWhiteSpace(orderQuery))
                return items.OrderBy(e => e.Name);

            return items.OrderBy(orderQuery);
        }
    }
}
