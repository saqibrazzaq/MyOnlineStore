using AutoMapper;
using hr.Dtos.Company;
using hr.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace hr
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Company
            CreateMap<CreateCompanyRequestDto, Company>();
            CreateMap<UpdateCompanyRequestDto, Company>();
            CreateMap<Company, CompanyResponseDto>();
            CreateMap<Company, CompanyDetailResponseDto>();
        }
    }
}
