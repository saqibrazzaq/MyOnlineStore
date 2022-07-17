using Common.Models.Request;
using Common.Models.Response;
using hr.Dtos.Employee;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace hr.Services
{
    public interface IEmployeeService
    {
        EmployeeDetailResponseDto FindByEmployeeId(Guid employeeId, FindByEmployeeIdRequestDto dto);
        EmployeeDetailResponseDto Create(CreateEmployeeRequestDto dto);
        void Update(Guid employeeId, UpdateEmployeeRequestDto dto);
        void Delete(Guid employeeId, DeleteEmployeeRequestDto dto);
        ApiOkPagedResponse<IEnumerable<EmployeeResponseDto>, MetaData>
            Search(SearchEmployeeRequestDto dto);
        int CountByDepartmentId(Guid departmentId);
        int CountByDesignationId(Guid designationId);
    }
}
