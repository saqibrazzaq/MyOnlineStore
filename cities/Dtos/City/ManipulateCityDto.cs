using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cities.Dtos.City
{
    public class ManipulateCityDto
    {
        [Required]
        public string? Name { get; set; }
        [Required]
        public Guid? StateId { get; set; }
    }
}
