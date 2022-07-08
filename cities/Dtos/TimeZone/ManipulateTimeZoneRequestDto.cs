using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cities.Dtos.TimeZone
{
    public class ManipulateTimeZoneRequestDto
    {
        [Required]
        public Guid CountryId { get; set; }
        [Required]
        public string? Name { get; set; }
        [Required]
        public int GmtOffset { get; set; }
        [Required]
        public string? GmtOffsetName { get; set; }
        [Required]
        public string? Abbreviation { get; set; }
        [Required]
        public string? TimeZoneName { get; set; }
    }
}
