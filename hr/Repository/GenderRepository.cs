using hr.Data;
using hr.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace hr.Repository
{
    public class GenderRepository : HrRepositoryBase<Gender>, IGenderRepository
    {
        public GenderRepository(HrDbContext context) : base(context)
        {
        }
    }
}
