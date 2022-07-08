using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cities.Dtos.Country
{
    public class CountryResponseDto
    {
        public Guid CountryId { get; set; }
        public string? CountryCode { get; set; }
        public string? Name { get; set; }

    }
}
