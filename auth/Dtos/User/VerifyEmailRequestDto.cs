using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace auth.Dtos.User
{
    public class VerifyEmailRequestDto
    {
        [Required]
        public string? PinCode { get; set; }


    }
}
