using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace hr.Dtos.Department
{
    public class DepartmentResponseDto
    {
        public Guid DepartmentId { get; set; }
        public string? Name { get; set; }
    }
}
