using Common.Models.Request;
using hr.Data;
using hr.Dtos.Employee;
using hr.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace hr.Repository
{
    public class EmployeeRepository : HrRepositoryBase<Employee>, IEmployeeRepository
    {
        public EmployeeRepository(HrDbContext context) : base(context)
        {
        }

        public PagedList<Employee> SearchEmployees(SearchEmployeeRequestDto dto, bool trackChanges)
        {
            var empEntities = FindAll(trackChanges)
                .Search(dto)
                .Sort(dto.OrderBy)
                .Skip((dto.PageNumber - 1) * dto.PageSize)
                .Take(dto.PageSize)
                .ToList();
            var count = FindAll(trackChanges: false)
                .Search(dto)
                .Count();
            return new PagedList<Employee>(empEntities, count,
                dto.PageNumber, dto.PageSize);
        }
    }
}
