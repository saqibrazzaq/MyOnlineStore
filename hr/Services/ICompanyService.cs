using Common.Models.Request;
using Common.Models.Response;
using hr.Dtos.Company;

namespace hr.Services
{
    public interface ICompanyService
    {
        IEnumerable<CompanyResponseDto> FindAll(FindAllCompaniesRequestDto dto);
        CompanyDetailResponseDto FindByCompanyId(Guid companyId, FindByCompanyIdRequestDto dto);
        CompanyDetailResponseDto Create(CreateCompanyRequestDto dto);
        void Update(Guid companyId, UpdateCompanyRequestDto dto);
        void Delete(Guid companyId, DeleteCompanyRequestDto dto);
        ApiOkPagedResponse<IEnumerable<CompanyResponseDto>, MetaData> 
            Search(SearchCompaniesRequestDto dto);
    }
}
