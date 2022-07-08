using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cities.Entities
{
    [Table("TimeZone")]
    public class TimeZone
    {
        [Key]
        public Guid TimeZoneId { get; set; }
        [Required]
        public string? Name { get; set; }
        public int GmtOffset { get; set; }
        public string? GmtOffsetName { get; set; }
        public string? Abbreviation { get; set; }
        public string? TimeZoneName { get; set; }

        // Foreign keys
        public Guid? CountryId { get; set; }
        [ForeignKey("CountryId")]
        public Country? Country { get; set; }
    }
}
