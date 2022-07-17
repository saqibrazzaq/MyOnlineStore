using Common.Models.Request;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace hr.Dtos.Employee
{
    public class ManipulateEmployeeDto : AccountDto
    {
        [Required, MaxLength(500)]
        public string? FirstName { get; set; }
        [MaxLength(500)]
        public string? MiddleName { get; set; }
        [Required, MaxLength(500)]
        public string? LastName { get; set; }
        [MaxLength(20)]
        public string? PhoneNumber { get; set; }
        public DateTime? HireDate { get; set; }
        public DateTime? BirthDate { get; set; }
        [MaxLength(500)]
        public string? Address1 { get; set; }
        [MaxLength(500)]
        public string? Address2 { get; set; }
        public Guid? CityId { get; set; }
        [Required]
        public Guid? DepartmentId { get; set; }
        [Required]
        public Guid? DesignationId { get; set; }
        [Required]
        public char? GenderCode { get; set; }

    }
}
