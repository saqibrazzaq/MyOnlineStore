using Common.Models.Request;
using Common.Models.Response;
using hr.Dtos.Department;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace hr.Services
{
    public interface IDepartmentService
    {
        DepartmentDetailResponseDto FindByDepartmentId(Guid departmentId, FindByDepartmentIdRequestDto dto);
        DepartmentDetailResponseDto Create(CreateDepartmentRequestDto dto);
        void Update(Guid departmentId, UpdateDepartmentRequestDto dto);
        void Delete(Guid departmentId, DeleteDepartmentRequestDto dto);
        ApiOkPagedResponse<IEnumerable<DepartmentResponseDto>, MetaData>
            Search(SearchDepartmentRequestDto dto);
        int CountByBranchId(Guid branchId);
    }
}
