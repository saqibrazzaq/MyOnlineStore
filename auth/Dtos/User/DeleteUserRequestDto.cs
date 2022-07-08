using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace auth.Dtos.User
{
    public class DeleteUserRequestDto
    {
        [Required(ErrorMessage = "Username is required")]
        [MaxLength(50, ErrorMessage = "Maximum 50 characters for Username")]
        public string? Username { get; set; }

        public DeleteUserRequestDto(string? username)
        {
            Username = username;
        }
    }
}
