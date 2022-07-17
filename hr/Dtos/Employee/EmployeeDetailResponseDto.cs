using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace hr.Dtos.Employee
{
    public class EmployeeDetailResponseDto
    {
        public Guid EmployeeId { get; set; }
        public string? FirstName { get; set; }
        public string? MiddleName { get; set; }
        public string? LastName { get; set; }
        public string? PhoneNumber { get; set; }
        public DateTime? HireDate { get; set; }
        public DateTime? BirthDate { get; set; }
        public string? Address1 { get; set; }
        public string? Address2 { get; set; }
        public Guid? CityId { get; set; }
        public Guid? DepartmentId { get; set; }
        public string? DepartmentName { get; set; }
        public Guid? DesignationId { get; set; }
        public string? DesignationName { get; set; }
        public char? GenderCode { get; set; }
        public string? GenderName { get; set; }
    }
}
