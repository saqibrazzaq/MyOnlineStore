using Common.Models.Request;
using hr.Data;
using hr.Dtos.Company;
using hr.Entities;

namespace hr.Repository
{
    public class CompanyRepository : HrRepositoryBase<Company>, ICompanyRepository
    {
        public CompanyRepository(HrDbContext context) : base(context)
        {
        }

        public PagedList<Company> SearchCompanies(SearchCompaniesRequestDto dto, 
            bool trackChanges)
        {
            var companyEntities = FindAll(trackChanges)
                .Search(dto)
                .Sort(dto.OrderBy)
                .Skip((dto.PageNumber - 1) * dto.PageSize)
                .Take(dto.PageSize)
                .ToList();
            var count = FindAll(trackChanges: false)
                .Search(dto)
                .Count();
            return new PagedList<Company>(companyEntities, count,
                dto.PageNumber, dto.PageSize);
        }
    }
}
