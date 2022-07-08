using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace auth.Dtos.User
{
    public class AuthenticationResponseDto
    {
        public string? Email { get; set; }
        public IEnumerable<string>? Roles { get; set; }
        public string? AccessToken { get; set; }
        public bool EmailConfirmed { get; set; } = false;
        public Guid? AccountId { get; set; }

        [JsonIgnore]
        public string? RefreshToken { get; set; }
    }
}
