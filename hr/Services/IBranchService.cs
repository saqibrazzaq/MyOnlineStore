using Common.Models.Request;
using Common.Models.Response;
using hr.Dtos.Branch;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace hr.Services
{
    public interface IBranchService
    {
        IEnumerable<BranchResponseDto> FindAll(FindAllBranchesRequestDto dto);
        BranchDetailResponseDto FindByBranchId(Guid branchId, FindByBranchIdRequestDto dto);
        BranchDetailResponseDto Create(CreateBranchRequestDto dto);
        void Update(Guid branchId, UpdateBranchRequestDto dto);
        void Delete(Guid branchId, DeleteBranchRequestDto dto);
        ApiOkPagedResponse<IEnumerable<BranchResponseDto>, MetaData>
            Search(SearchBranchesRequestDto dto);
    }
}
