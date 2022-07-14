using Common.Models.Request;
using hr.Dtos.Department;
using hr.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace hr.Repository
{
    public interface IDepartmentRepository : IHrRepositoryBase<Department>
    {
        PagedList<Department> SearchDepartments(SearchDepartmentRequestDto dto,
            bool trackChanges);
    }
}
