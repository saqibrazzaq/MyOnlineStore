using hr.Data;
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
    }
}
