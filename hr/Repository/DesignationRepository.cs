using Common.Models.Request;
using hr.Data;
using hr.Dtos.Designation;
using hr.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace hr.Repository
{
    public class DesignationRepository : HrRepositoryBase<Designation>, IDesignationRepository
    {
        public DesignationRepository(HrDbContext context) : base(context)
        {
        }

        public PagedList<Designation> SearchDesignations(SearchDesignationRequestDto dto,
            bool trackChanges)
        {
            var designationEntities = FindAll(trackChanges)
                .Search(dto)
                .Sort(dto.OrderBy)
                .Skip((dto.PageNumber - 1) * dto.PageSize)
                .Take(dto.PageSize)
                .ToList();
            var count = FindAll(trackChanges: false)
                .Search(dto)
                .Count();
            return new PagedList<Designation>(designationEntities, count,
                dto.PageNumber, dto.PageSize);
        }
    }
}
