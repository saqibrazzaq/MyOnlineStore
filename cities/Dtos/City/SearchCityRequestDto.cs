using Common.Models.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cities.Dtos.City
{
    public class SearchCityRequestDto : PagedRequestDto
    {
        public Guid? StateId { get; set; }
        public Guid? CityId { get; set; }
    }
}
