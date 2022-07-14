using Common.Repository;
using hr.Dtos.Branch;
using hr.Entities;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;

namespace hr.Repository
{
    public static class BranchRepositoryExtensions
    {
        public static IQueryable<Branch> Search(this IQueryable<Branch> items,
            SearchBranchesRequestDto searchParams)
        {
            var itemsToReturn = items
                .Include(i => i.Company)
                .Where(x => x.Company.AccountId == searchParams.AccountId);

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

        public static IQueryable<Branch> Sort(this IQueryable<Branch> items,
            string? orderBy)
        {
            if (string.IsNullOrWhiteSpace(orderBy))
                return items.OrderBy(e => e.Name);

            var orderQuery = OrderQueryBuilder.CreateOrderQuery<Branch>(orderBy);

            if (string.IsNullOrWhiteSpace(orderQuery))
                return items.OrderBy(e => e.Name);

            return items.OrderBy(orderQuery);
        }
    }
}
