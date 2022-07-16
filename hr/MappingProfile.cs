using AutoMapper;
using hr.Dtos.Branch;
using hr.Dtos.Company;
using hr.Dtos.Department;
using hr.Dtos.Designation;
using hr.Dtos.Gender;
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
            CreateMap<Branch, BranchDetailResponseDto>()
                .ForMember(dest => dest.CompanyName, opt => opt.MapFrom(src => src.Company.Name));
            CreateMap<CreateBranchRequestDto, Branch>();
            CreateMap<UpdateBranchRequestDto, Branch>();

            // Department
            CreateMap<Department, DepartmentResponseDto>();
            CreateMap<Department, DepartmentDetailResponseDto>()
                .ForMember(dest => dest.CompanyName, opt => opt.MapFrom(src => src.Branch.Company.Name));
            CreateMap<CreateDepartmentRequestDto, Department>();
            CreateMap<UpdateDepartmentRequestDto, Department>();

            // Designation
            CreateMap<Designation, DesignationResponseDto>();
            CreateMap<Designation, DesignationDetailResponseDto>();
            CreateMap<CreateDesignationRequestDto, Designation>();
            CreateMap<UpdateDesignationRequestDto, Designation>();

            // Gender
            CreateMap<Gender, GenderResponseDto>();
        }
    }
}
