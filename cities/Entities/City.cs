using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cities.Entities
{
    [Table("City")]
    public class City
    {
        [Key]
        public Guid CityId { get; set; }
        [Required]
        public string? Name { get; set; }

        // Foreign keys
        public Guid? StateId { get; set; }
        [ForeignKey("StateId")]
        public State? State { get; set; }
    }
}
