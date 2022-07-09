using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace hr.Entities
{
    [Table("Company")]
    public class Company
    {
        [Key]
        public Guid CompanyId { get; set; }
        [Required, MaxLength(500)]
        public string? Name { get; set; }
        [MaxLength(500)]
        public string? Address1 { get; set; }
        [MaxLength(500)]
        public string? Address2 { get; set; }

        // Microservice Api keys
        public Guid? CityId { get; set; }
        [Required]
        public Guid? AccountId { get; set; }

        // Child tables
        public IEnumerable<Branch>? Branches { get; set; }
    }
}
