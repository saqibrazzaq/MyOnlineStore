using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace auth.Dtos.User
{
    public class TokenDto
    {
        [Required(ErrorMessage = "Access token is required")]
        public string? AccessToken { get; set; }
        [JsonIgnore]
        public string? RefreshToken { get; set; }
    }
}
