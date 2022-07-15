using hr.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace hr.Data
{
    public class HrDbContext : DbContext
    {
        public HrDbContext(DbContextOptions<HrDbContext> options) : base(options)
        {
        }

        // Tables in Database context
        public DbSet<Branch>? Branches { get; set; }
        public DbSet<Company>? Companies { get; set; }
        public DbSet<Department>? Departments { get; set; }
        public DbSet<Designation>? Designations { get; set; }
        public DbSet<Employee>? Employees { get; set; }
        public DbSet<Gender>? Genders { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Branch>()
                .HasOne(x => x.Company)
                .WithMany(x => x.Branches)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Department>()
                .HasOne(x => x.Branch)
                .WithMany(x => x.Departments)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
