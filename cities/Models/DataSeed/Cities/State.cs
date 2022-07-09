using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cities.Models.DataSeed.Cities
{
    internal class State
    {
        public string? name { get; set; }
        public string? state_code { get; set; }
        public IList<City>? cities { get; set; }
    }
}
