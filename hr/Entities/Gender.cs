using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace hr.Entities
{
    [Table("Gender")]
    public class Gender
    {
        [Key, Required, MaxLength(1)]
        public char GenderCode { get; set; }
        [Required, MaxLength(6)]
        public string? Name { get; set; }
    }
}
