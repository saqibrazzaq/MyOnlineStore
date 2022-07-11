using Common.Models.Request;
using hr.Dtos.Branch;
using hr.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace hr.Repository
{
    public interface IBranchRepository : IHrRepositoryBase<Branch>
    {
        PagedList<Branch> SearchBranches(SearchBranchesRequestDto dto,
            bool trackChanges);
    }
}
