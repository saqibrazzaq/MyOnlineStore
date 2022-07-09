using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cities.Models.DataSeed.Cities
{
    internal class TimeZone
    {
        public string? zoneName { get; set; }
        public int gmtOffset { get; set; }
        public string? gmtOffsetName { get; set; }
        public string? abbreviation { get; set; }
        public string? tzName { get; set; }
    }
}
