using Common.Models.Exceptions;
using Common.Repository;
using Common.Utility;
using hr.Dtos.Employee;
using hr.Entities;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;

namespace hr.Repository
{
    public static class EmployeeRepositoryExtensions
    {
        public static IQueryable<Employee> Search(this IQueryable<Employee> items,
            SearchEmployeeRequestDto searchParams)
        {
            var itemsToReturn = items
                .Include(i => i.Department.Branch.Company)
                .Include(i => i.Designation)
                .Where(x => x.Designation.AccountId == searchParams.AccountId);

            
            if (string.IsNullOrWhiteSpace(searchParams.SearchText) == false)
            {
                itemsToReturn = itemsToReturn.Where(
                    x => (x.FirstName ?? "").ToLower().Contains(searchParams.SearchText) ||
                        (x.LastName ?? "").ToLower().Contains(searchParams.SearchText) ||
                        (x.MiddleName ?? "").ToLower().Contains(searchParams.SearchText) ||
                        (x.PhoneNumber ?? "").ToLower().Contains(searchParams.SearchText) ||
                        (x.Address1 ?? "").ToLower().Contains(searchParams.SearchText) ||
                        (x.Address2 ?? "").ToLower().Contains(searchParams.SearchText)
                );
            }

            if (searchParams.CompanyId != null && searchParams.CompanyId != Guid.Empty)
            {
                itemsToReturn = itemsToReturn.Where(
                    x => x.Department.Branch.CompanyId == searchParams.CompanyId);
            }

            if (searchParams.BranchId != null && searchParams.BranchId != Guid.Empty)
            {
                itemsToReturn = itemsToReturn.Where(
                    x => x.Department.BranchId == searchParams.BranchId);
            }

            if (searchParams.DepartmentId != null && searchParams.DepartmentId != Guid.Empty)
            {
                itemsToReturn = itemsToReturn.Where(
                    x => x.DepartmentId == searchParams.DepartmentId);
            }

            if (searchParams.DesignationId != null && searchParams.DesignationId != Guid.Empty)
            {
                itemsToReturn = itemsToReturn.Where(
                    x => x.DesignationId == searchParams.DesignationId);
            }

            if (searchParams.CityId != null && searchParams.CityId != Guid.Empty)
            {
                itemsToReturn = itemsToReturn.Where(
                    x => x.CityId == searchParams.CityId);
            }

            if (searchParams.MinAge != 0)
            {
                itemsToReturn = itemsToReturn.Where(
                    x => DateTimeUtils.CalculateAge(x.BirthDate) >= searchParams.MinAge);
            }

            if (searchParams.MaxAge != 0)
            {
                itemsToReturn = itemsToReturn.Where(
                    x => DateTimeUtils.CalculateAge(x.BirthDate) <= searchParams.MaxAge);
            }

            return itemsToReturn;
        }

        public static IQueryable<Employee> Sort(this IQueryable<Employee> items,
            string? orderBy)
        {
            if (string.IsNullOrWhiteSpace(orderBy))
                return items.OrderBy(e => e.FirstName);

            var orderQuery = OrderQueryBuilder.CreateOrderQuery<Employee>(orderBy);

            if (string.IsNullOrWhiteSpace(orderQuery))
                return items.OrderBy(e => e.FirstName);

            return items.OrderBy(orderQuery);
        }
    }
}
