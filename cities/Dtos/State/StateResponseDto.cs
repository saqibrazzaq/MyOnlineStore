using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cities.Dtos.State
{
    public class StateResponseDto
    {
        public Guid StateId { get; set; }
        public string? StateCode { get; set; }
        public string? Name { get; set; }
        public Guid? CountryId { get; set; }
    }
}
