﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace hr.Dtos.Designation
{
    public class DesignationDetailResponseDto
    {
        public Guid? DesignationId { get; set; }
        public string? Name { get; set; }
        public int EmployeeCount { get; set; }
    }
}
