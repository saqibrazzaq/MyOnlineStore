using hr.Data;
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
    }
}
