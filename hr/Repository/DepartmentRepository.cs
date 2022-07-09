using hr.Data;
using hr.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace hr.Repository
{
    public class DepartmentRepository : HrRepositoryBase<Department>, IDepartmentRepository
    {
        public DepartmentRepository(HrDbContext context) : base(context)
        {
        }
    }
}
