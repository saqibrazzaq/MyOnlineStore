using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace hr.Dtos.Branch
{
    public class BranchResponseDto
    {
        public Guid BranchId { get; set; }
        public string? Name { get; set; }
    }
}
