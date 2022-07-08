using cities.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cities.Data
{
    public class CitiesDbContext : DbContext
    {
        public CitiesDbContext(DbContextOptions options) : base(options)
        {
        }

        // Tables in Database context
        public DbSet<Country>? Countries { get; set; }
        public DbSet<Entities.TimeZone>? TimeZones { get; set; }
        public DbSet<State>? States { get; set; }
        public DbSet<City>? Cities { get; set; }

    }
}
