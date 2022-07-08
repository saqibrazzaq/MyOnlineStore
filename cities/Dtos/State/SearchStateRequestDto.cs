using Common.Models.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cities.Dtos.State
{
    public class SearchStateRequestDto : PagedRequestDto
    {
        public Guid? CountryId { get; set; }
        public Guid? StateId { get; set; }
    }
}
