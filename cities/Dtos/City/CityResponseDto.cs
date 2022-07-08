using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cities.Dtos.City
{
    public class CityResponseDto
    {
        public Guid CityId { get; set; }
        public string? Name { get; set; }
        public Guid? StateId { get; set; }
    }
}
