using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace hr.Dtos.Employee
{
    public class EmployeeResponseDto
    {
        public Guid EmployeeId { get; set; }
        public string? FirstName { get; set; }
        public string? MiddleName { get; set; }
        public string? LastName { get; set; }
        public string? PhoneNumber { get; set; }
        public Guid? DesignationId { get; set; }
        public string? DesignationName { get; set; }
    }
}
