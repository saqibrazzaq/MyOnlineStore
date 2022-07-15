using Common.Models.Request;
using hr.Dtos.Designation;
using hr.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace hr.Repository
{
    public interface IDesignationRepository : IHrRepositoryBase<Designation>
    {
        PagedList<Designation> SearchDesignations(SearchDesignationRequestDto dto,
            bool trackChanges);
    }
}
