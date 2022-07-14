using Common.Models.Request;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace hr.Dtos.Department
{
    public class SearchDepartmentRequestDto : PagedRequestDto
    {
        [Required]
        public Guid? BranchId { get; set; }
    }
}
