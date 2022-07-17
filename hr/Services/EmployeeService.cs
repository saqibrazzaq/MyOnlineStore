using AutoMapper;
using Common.Models.Exceptions;
using Common.Models.Request;
using Common.Models.Response;
using hr.Dtos.Employee;
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
    public class EmployeeService : IEmployeeService
    {
        private readonly IHrRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public EmployeeService(IHrRepositoryManager repositoryManager, 
            IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public int CountByDepartmentId(Guid departmentId)
        {
            var count = _repositoryManager.EmployeeRepository.FindByCondition(
                x => x.DepartmentId == departmentId,
                trackChanges: false)
                .Count();
            return count;
        }

        public int CountByDesignationId(Guid designationId)
        {
            var count = _repositoryManager.EmployeeRepository.FindByCondition(
                x => x.DesignationId == designationId,
                trackChanges: false)
                .Count();
            return count;
        }

        public EmployeeDetailResponseDto Create(CreateEmployeeRequestDto dto)
        {
            var empEntity = _mapper.Map<Employee>(dto);
            _repositoryManager.EmployeeRepository.Create(empEntity);
            _repositoryManager.Save();
            return _mapper.Map<EmployeeDetailResponseDto>(empEntity);
        }

        public void Delete(Guid employeeId, DeleteEmployeeRequestDto dto)
        {
            var empEntity = findByEmployeeIdIfExists(employeeId, dto.AccountId, true);
            _repositoryManager.EmployeeRepository.Delete(empEntity);
            _repositoryManager.Save();
        }

        private Employee findByEmployeeIdIfExists(Guid employeeId, Guid? accountId, bool trackChanges)
        {
            var empEntity = _repositoryManager.EmployeeRepository.FindByCondition(
                x => x.EmployeeId == employeeId &&
                    x.Designation.AccountId == accountId,
                trackChanges,
                include: i => i.Include(x => x.Designation))
                .FirstOrDefault();
            if (empEntity == null)
                throw new NotFoundException("No employee found with id " + employeeId);

            return empEntity;
        }

        public EmployeeDetailResponseDto FindByEmployeeId(Guid employeeId, FindByEmployeeIdRequestDto dto)
        {
            var empDetailDto = findEmployeeDetailsByEmployeeId(employeeId, dto.AccountId, false);
            return empDetailDto;
        }

        private EmployeeDetailResponseDto findEmployeeDetailsByEmployeeId(Guid employeeId, Guid? accountId, bool trackChanges)
        {
            var empEntity = _repositoryManager.EmployeeRepository.FindByCondition(
                x => x.EmployeeId == employeeId && x.Designation.AccountId == accountId,
                trackChanges,
                include: i => i
                    .Include(x => x.Designation)
                    .Include(x => x.Department)
                    .Include(x => x.Gender)
                    )
                .FirstOrDefault();
            if (empEntity == null)
                throw new NotFoundException("No employee found with id " + employeeId);

            return _mapper.Map<EmployeeDetailResponseDto>(empEntity);
        }

        public ApiOkPagedResponse<IEnumerable<EmployeeResponseDto>, MetaData> Search(SearchEmployeeRequestDto dto)
        {
            var empPagedEntities = _repositoryManager.EmployeeRepository.
                SearchEmployees(dto, false);
            var empDtos = _mapper.Map<IEnumerable<EmployeeResponseDto>>(empPagedEntities);
            return new ApiOkPagedResponse<IEnumerable<EmployeeResponseDto>, MetaData>(empDtos,
                empPagedEntities.MetaData);
        }

        public void Update(Guid employeeId, UpdateEmployeeRequestDto dto)
        {
            var empEntity = findByEmployeeIdIfExists(employeeId, dto.AccountId, true);
            _mapper.Map(dto, empEntity);
            _repositoryManager.Save();
        }
    }
}
