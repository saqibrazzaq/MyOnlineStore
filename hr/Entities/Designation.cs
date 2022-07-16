using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace hr.Entities
{
    [Table("Designation")]
    public class Designation
    {
        [Key]
        public Guid DesignationId { get; set; }
        [Required, MaxLength(500)]
        public string? Name { get; set; }

        // Microservice Api keys
        public Guid? AccountId { get; set; }

        // Child tables
        public IEnumerable<Employee>? Employees { get; set; }
    }
}
