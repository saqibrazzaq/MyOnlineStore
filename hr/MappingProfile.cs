using AutoMapper;
using hr.Dtos.Branch;
using hr.Dtos.Company;
using hr.Dtos.Department;
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

            // Branch
            CreateMap<Branch, BranchResponseDto>();
            CreateMap<Branch, BranchDetailResponseDto>();
            CreateMap<CreateBranchRequestDto, Branch>();
            CreateMap<UpdateBranchRequestDto, Branch>();

            // Department
            CreateMap<Department, DepartmentResponseDto>();
            CreateMap<Department, DepartmentDetailResponseDto>();
            CreateMap<CreateDepartmentRequestDto, Department>();
            CreateMap<UpdateDepartmentRequestDto, Department>();
        }
    }
}
