using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace hr.Entities
{
    [Table("Department")]
    public class Department
    {
        [Key]
        public Guid DepartmentId { get; set; }
        [Required, MaxLength(500)]
        public string? Name { get; set; }

        // Foreign keys
        [Required]
        public Guid? BranchId { get; set; }
        [ForeignKey("BranchId")]
        public Branch? Branch { get; set; }

        // Child tables
        public IEnumerable<Employee>? Employees { get; set; }
    }
}
