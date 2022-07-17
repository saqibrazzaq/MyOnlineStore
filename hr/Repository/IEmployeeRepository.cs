using Common.Models.Request;
using hr.Dtos.Employee;
using hr.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace hr.Repository
{
    public interface IEmployeeRepository : IHrRepositoryBase<Employee>
    {
        PagedList<Employee> SearchEmployees(SearchEmployeeRequestDto dto,
            bool trackChanges);
    }
}
