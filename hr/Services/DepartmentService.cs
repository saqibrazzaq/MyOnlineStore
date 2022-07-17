using AutoMapper;
using Common.Models.Exceptions;
using Common.Models.Request;
using Common.Models.Response;
using hr.Dtos.Department;
using hr.Entities;
using hr.Repository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace hr.Services
{
    public class DepartmentService : IDepartmentService
    {
        private readonly IHrRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        private readonly IEmployeeService _employeeService;
        public DepartmentService(IHrRepositoryManager repositoryManager,
            IMapper mapper, 
            IEmployeeService employeeService)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
            _employeeService = employeeService;
        }

        public int CountByBranchId(Guid branchId)
        {
            var count = _repositoryManager.DepartmentRepository.FindByCondition(
                x => x.BranchId == branchId,
                trackChanges: false)
                .Count();
            return count;
        }

        public DepartmentDetailResponseDto Create(CreateDepartmentRequestDto dto)
        {
            var deptEntity = _mapper.Map<Department>(dto);
            _repositoryManager.DepartmentRepository.Create(deptEntity);
            _repositoryManager.Save();
            return _mapper.Map<DepartmentDetailResponseDto>(deptEntity);
        }

        public void Delete(Guid departmentId, DeleteDepartmentRequestDto dto)
        {
            var branchEntity = findByDepartmentIdIfExists(departmentId, dto.AccountId, true);
            _repositoryManager.DepartmentRepository.Delete(branchEntity);
            _repositoryManager.Save();
        }

        private Department findByDepartmentIdIfExists(Guid departmentId, Guid? accountId, bool trackChanges)
        {
            var deptEntity = _repositoryManager.DepartmentRepository.FindByCondition(
                x => x.DepartmentId == departmentId && x.Branch.Company.AccountId == accountId,
                trackChanges,
                include: i => i.Include(x => x.Branch.Company)
                )
                .FirstOrDefault();
            if (deptEntity == null)
                throw new NotFoundException("No department found with id " + departmentId);

            return deptEntity;
        }

        public DepartmentDetailResponseDto FindByDepartmentId(Guid departmentId, FindByDepartmentIdRequestDto dto)
        {
            var deptEntity = findByDepartmentIdIfExists(departmentId, dto.AccountId, false);
            var deptDto = _mapper.Map<DepartmentDetailResponseDto>(deptEntity);
            deptDto.EmployeeCount = _employeeService.CountByDepartmentId(departmentId);
            return deptDto;
        }

        public ApiOkPagedResponse<IEnumerable<DepartmentResponseDto>, MetaData> Search(SearchDepartmentRequestDto dto)
        {
            var deptPagedEntities = _repositoryManager.DepartmentRepository.
                SearchDepartments(dto, false);
            var deptDtos = _mapper.Map<IEnumerable<DepartmentResponseDto>>(deptPagedEntities);
            return new ApiOkPagedResponse<IEnumerable<DepartmentResponseDto>, MetaData>(deptDtos,
                deptPagedEntities.MetaData);
        }

        public void Update(Guid departmentId, UpdateDepartmentRequestDto dto)
        {
            var deptEntity = findByDepartmentIdIfExists(departmentId, dto.AccountId, true);
            _mapper.Map(dto, deptEntity);
            _repositoryManager.Save();
        }
    }
}
