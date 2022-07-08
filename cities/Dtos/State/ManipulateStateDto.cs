using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cities.Dtos.State
{
    public class ManipulateStateDto
    {
        [Required]
        public string? StateCode { get; set; }
        [Required]
        public string? Name { get; set; }

        [Required]
        public Guid? CountryId { get; set; }
    }
}
