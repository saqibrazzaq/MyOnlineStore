using Common.Models.Request;
using Common.Models.Response;
using hr.Dtos.Designation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace hr.Services
{
    public interface IDesignationService
    {
        DesignationResponseDto FindByDesignationId(Guid designationId, FindByDesignationIdRequestDto dto);
        DesignationResponseDto Create(CreateDesignationRequestDto dto);
        void Update(Guid designationId, UpdateDesignationRequestDto dto);
        void Delete(Guid designationId, DeleteDesignationRequestDto dto);
        ApiOkPagedResponse<IEnumerable<DesignationResponseDto>, MetaData>
            Search(SearchDesignationRequestDto dto);
        int Count(Guid accountId);
    }
}
