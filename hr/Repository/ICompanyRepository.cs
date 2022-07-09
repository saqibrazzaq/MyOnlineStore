using Common.Models.Request;
using hr.Dtos.Company;
using hr.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace hr.Repository
{
    public interface ICompanyRepository : IHrRepositoryBase<Company>
    {
        PagedList<Company> SearchCompanies(
            SearchCompaniesRequestDto dto, bool trackChanges);
    }
}
