﻿using Common.Models.Exceptions;
using Common.Repository;
using hr.Dtos.Department;
using hr.Entities;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;

namespace hr.Repository
{
    public static class DepartmentRepositoryExtensions
    {
        public static IQueryable<Department> Search(this IQueryable<Department> items,
            SearchDepartmentRequestDto searchParams)
        {
            if (searchParams.BranchId == null || searchParams.BranchId == Guid.Empty)
            {
                throw new BadRequestException("Please select a branch");
            }

            var itemsToReturn = items
                .Include(i => i.Branch.Company)
                .Where(x => x.Branch.Company.AccountId == searchParams.AccountId);

            itemsToReturn = itemsToReturn.Where(
                    x => x.Branch.CompanyId == searchParams.BranchId);

            if (string.IsNullOrWhiteSpace(searchParams.SearchText) == false)
            {
                itemsToReturn = itemsToReturn.Where(
                    x => (x.Name ?? "").ToLower().Contains(searchParams.SearchText)
                );
            }

            return itemsToReturn;
        }

        public static IQueryable<Department> Sort(this IQueryable<Department> items,
            string? orderBy)
        {
            if (string.IsNullOrWhiteSpace(orderBy))
                return items.OrderBy(e => e.Name);

            var orderQuery = OrderQueryBuilder.CreateOrderQuery<Department>(orderBy);

            if (string.IsNullOrWhiteSpace(orderQuery))
                return items.OrderBy(e => e.Name);

            return items.OrderBy(orderQuery);
        }
    }
}
