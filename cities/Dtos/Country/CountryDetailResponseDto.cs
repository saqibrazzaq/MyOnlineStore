using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cities.Dtos.Country
{
    public class CountryDetailResponseDto
    {
        public Guid CountryId { get; set; }
        public string? CountryCode { get; set; }
        public string? Name { get; set; }
        public string? PhoneCode { get; set; }
        public string? Capital { get; set; }
        public string? Currency { get; set; }
        public string? CurrencyName { get; set; }
        public string? CurrencySymbol { get; set; }
        public string? NativeName { get; set; }
        public string? Region { get; set; }
        public string? SubRegion { get; set; }
    }
}
