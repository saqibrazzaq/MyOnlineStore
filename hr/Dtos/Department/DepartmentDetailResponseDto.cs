using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace hr.Dtos.Department
{
    public class DepartmentDetailResponseDto
    {
        public Guid DepartmentId { get; set; }
        public string? Name { get; set; }
        public Guid? BranchId { get; set; }
        public string? BranchName { get; set; }
        public Guid? CompanyId { get; set; }
        public string? CompanyName { get; set; }
    }
}
