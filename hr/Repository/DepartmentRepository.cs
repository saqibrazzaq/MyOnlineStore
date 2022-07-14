using Common.Models.Request;
using hr.Data;
using hr.Dtos.Department;
using hr.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace hr.Repository
{
    public class DepartmentRepository : HrRepositoryBase<Department>, IDepartmentRepository
    {
        public DepartmentRepository(HrDbContext context) : base(context)
        {
        }

        public PagedList<Department> SearchDepartments(SearchDepartmentRequestDto dto,
            bool trackChanges)
        {
            var deptEntities = FindAll(trackChanges)
                .Search(dto)
                .Sort(dto.OrderBy)
                .Skip((dto.PageNumber - 1) * dto.PageSize)
                .Take(dto.PageSize)
                .ToList();
            var count = FindAll(trackChanges: false)
                .Search(dto)
                .Count();
            return new PagedList<Department>(deptEntities, count,
                dto.PageNumber, dto.PageSize);
        }
    }
}
