using Common.Models.Request;
using Common.Models.Response;
using hr.Dtos.Company;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace hr.Services
{
    public interface ICompanyService
    {
        IEnumerable<CompanyResponseDto> FindAll();
        CompanyDetailResponseDto FindByCompanyId(Guid companyId);
        CompanyDetailResponseDto Create(CreateCompanyRequestDto dto);
        void Update(Guid companyId, UpdateCompanyRequestDto dto);
        void Delete(Guid companyId);
        ApiOkPagedResponse<IEnumerable<CompanyResponseDto>, MetaData> 
            Search(SearchCompaniesRequestDto dto);
    }
}
