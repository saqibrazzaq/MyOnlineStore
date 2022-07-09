using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace hr.Dtos.Branch
{
    public class ManipulateBranchDto
    {
        [Required, MaxLength(500)]
        public string? Name { get; set; }
        [MaxLength(500)]
        public string? Address1 { get; set; }
        [MaxLength(500)]
        public string? Address2 { get; set; }
        [Required]
        public Guid? CompanyId { get; set; }
        public Guid? CityId { get; set; }
    }
}
