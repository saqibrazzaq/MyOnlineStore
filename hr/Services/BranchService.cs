using AutoMapper;
using Common.Models.Exceptions;
using Common.Models.Request;
using Common.Models.Response;
using hr.Dtos.Branch;
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
    public class BranchService : IBranchService
    {
        private readonly IHrRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public BranchService(IHrRepositoryManager repositoryManager,
            IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }
        public BranchDetailResponseDto Create(CreateBranchRequestDto dto)
        {
            var branchEntity = _mapper.Map<Branch>(dto);
            _repositoryManager.BranchRepository.Create(branchEntity);
            _repositoryManager.Save();
            return _mapper.Map<BranchDetailResponseDto>(branchEntity);
        }

        public void Delete(Guid branchId, DeleteBranchRequestDto dto)
        {
            var branchEntity = findByBranchIdIfExists(branchId, dto.AccountId, true);
            _repositoryManager.BranchRepository.Delete(branchEntity);
            _repositoryManager.Save();
        }

        private Branch findByBranchIdIfExists(Guid branchId, Guid? accountId, bool trackChanges)
        {
            var branchEntity = _repositoryManager.BranchRepository.FindByCondition(
                x => x.BranchId == branchId && x.Company.AccountId == accountId,
                trackChanges,
                include: i => i.Include(x => x.Company)
                )
                .FirstOrDefault();
            if (branchEntity == null)
                throw new NotFoundException("No branch found with id " + branchId);

            return branchEntity;
        }

        public IEnumerable<BranchResponseDto> FindAll(FindAllBranchesRequestDto dto)
        {
            if (dto == null) throw new BadRequestException("User not logged in");

            var branchEntities = _repositoryManager.BranchRepository.FindByCondition(
                x => x.Company.AccountId == dto.AccountId,
                trackChanges: false,
                include: i => i.Include(x => x.Company));
            var branchDtos = _mapper.Map<IEnumerable<BranchResponseDto>>(branchEntities);
            return branchDtos;
        }

        public BranchDetailResponseDto FindByBranchId(Guid branchId, FindByBranchIdRequestDto dto)
        {
            var branchEntity = findByBranchIdIfExists(branchId, dto.AccountId, false);
            var branchDto = _mapper.Map<BranchDetailResponseDto>(branchEntity);
            return branchDto;
        }

        public ApiOkPagedResponse<IEnumerable<BranchResponseDto>, MetaData> 
            Search(SearchBranchesRequestDto dto)
        {
            var branchPagedEntities = _repositoryManager.BranchRepository.
                SearchBranches(dto, false);
            var branchDtos = _mapper.Map<IEnumerable<BranchResponseDto>>(branchPagedEntities);
            return new ApiOkPagedResponse<IEnumerable<BranchResponseDto>, MetaData>(branchDtos,
                branchPagedEntities.MetaData);
        }

        public void Update(Guid branchId, UpdateBranchRequestDto dto)
        {
            var branchEntity = findByBranchIdIfExists(branchId, dto.AccountId, true);
            _mapper.Map(dto, branchEntity);
            _repositoryManager.Save();
        }

        public int CountByCompanyId(Guid companyId)
        {
            var count = _repositoryManager.BranchRepository.FindByCondition(
                x => x.CompanyId == companyId,
                trackChanges: false)
                .Count();
            return count;
        }
    }
}
