using Common.Models.Request;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace hr.Dtos.Company
{
    public class ManipulateCompanyDto : AccountDto
    {
        [Required, MaxLength(500)]
        public string? Name { get; set; }
        [MaxLength(500)]
        public string? Address1 { get; set; }
        [MaxLength(500)]
        public string? Address2 { get; set; }
        // Microservice Api keys
        public Guid? CityId { get; set; } = Guid.Empty;
    }
}
