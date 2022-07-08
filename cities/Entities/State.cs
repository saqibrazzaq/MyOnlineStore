using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cities.Entities
{
    [Table("State")]
    public class State
    {
        [Key]
        public Guid StateId { get; set; }
        [Required]
        public string? StateCode { get; set; }
        [Required]
        public string? Name { get; set; }

        // Foreign keys
        public Guid? CountryId { get; set; }
        [ForeignKey("CountryId")]
        public Country? Country { get; set; }

        // Child tables
        public IEnumerable<City>? Cities { get; set; }

    }
}
