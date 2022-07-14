using Common.Models.Request;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace hr.Dtos.Department
{
    public class ManipulateDepartmentDto : AccountDto
    {
        [Required, MaxLength(500)]
        public string? Name { get; set; }
        
        [Required]
        public Guid? BranchId { get; set; }
    }
}
