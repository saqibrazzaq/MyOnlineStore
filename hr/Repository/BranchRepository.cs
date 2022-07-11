using Common.Models.Request;
using hr.Data;
using hr.Dtos.Branch;
using hr.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace hr.Repository
{
    public class BranchRepository : HrRepositoryBase<Branch>, IBranchRepository
    {
        public BranchRepository(HrDbContext context) : base(context)
        {
        }

        public PagedList<Branch> SearchBranches (SearchBranchesRequestDto dto,
            bool trackChanges)
        {
            var branchEntities = FindAll(trackChanges)
                .Search(dto)
                .Sort(dto.OrderBy)
                .Skip((dto.PageNumber - 1) * dto.PageSize)
                .Take(dto.PageSize)
                .ToList();
            var count = FindAll(trackChanges: false)
                .Search(dto)
                .Count();
            return new PagedList<Branch>(branchEntities, count,
                dto.PageNumber, dto.PageSize);
        }
    }
}
