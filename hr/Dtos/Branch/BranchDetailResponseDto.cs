using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace hr.Dtos.Branch
{
    public class BranchDetailResponseDto
    {
        public Guid BranchId { get; set; }
        public string? Name { get; set; }
        public string? Address1 { get; set; }
        public string? Address2 { get; set; }
        public Guid? CompanyId { get; set; }
        public Guid? CityId { get; set; }
    }
}
