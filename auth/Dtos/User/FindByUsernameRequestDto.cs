using Common.Models.Request;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace auth.Dtos.User
{
    public class FindByUsernameRequestDto : AccountDto
    {
        [Required(ErrorMessage = "Username is required")]
        [MaxLength(50, ErrorMessage = "Maximum 50 characters for Username")]
        public string? Username { get; set; }
    }
}
