using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace hr.Entities
{
    [Table("Employee")]
    public class Employee
    {
        [Key]
        public Guid EmployeeId { get; set; }
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

        // Microservice Api keys from
        public Guid? CityId { get; set; }

        // Foreign keys
        public Guid? DepartmentId { get; set; }
        [ForeignKey("DepartmentId")]
        public Department? Department { get; set; }

        public Guid? DesignationId { get; set; }
        [ForeignKey("DesignationId")]
        public Designation? Designation { get; set; }

        public char? GenderCode { get; set; }
        [ForeignKey("GenderCode")]
        public Gender? Gender { get; set; }
    }
}
