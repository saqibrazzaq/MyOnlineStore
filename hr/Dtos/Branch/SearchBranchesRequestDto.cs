using Common.Models.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace hr.Dtos.Branch
{
    public class SearchBranchesRequestDto : PagedRequestDto
    {
        public Guid? CompanyId { get; set; }
    }
}
