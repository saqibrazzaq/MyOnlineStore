using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace hr.Dtos.Company
{
    public class CompanyDetailResponseDto
    {
        public Guid CompanyId { get; set; }
        public string? Name { get; set; }
        public string? Address1 { get; set; }
        public string? Address2 { get; set; }
        public Guid? CityId { get; set; }
        public Guid? AccountId { get; set; }
        public int BranchCount { get; set; } = 0;
    }
}
