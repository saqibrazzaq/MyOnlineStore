using AutoMapper;
using Common.Models.Exceptions;
using Common.Models.Request;
using Common.Models.Response;
using hr.Dtos.Company;
using hr.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace hr.Services
{
    public class CompanyService : ICompanyService
    {
        private readonly IHrRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        private readonly IBranchService _branchService;
        public CompanyService(IHrRepositoryManager repositoryManager,
            IMapper mapper, 
            IBranchService branchService)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
            _branchService = branchService;
        }

        public CompanyDetailResponseDto Create(CreateCompanyRequestDto dto)
        {
            var companyEntity = _mapper.Map<Entities.Company>(dto);
            _repositoryManager.CompanyRepository.Create(companyEntity);
            _repositoryManager.Save();
            return _mapper.Map<CompanyDetailResponseDto>(companyEntity);
        }

        public void Delete(Guid companyId, DeleteCompanyRequestDto dto)
        {
            var companyEntity = findByCompanyIdIfExists(companyId, dto.AccountId, true);
            _repositoryManager.CompanyRepository.Delete(companyEntity);
            _repositoryManager.Save();
        }

        private Entities.Company findByCompanyIdIfExists(Guid companyId, Guid? accountId, bool trackChanges)
        {
            var companyEntity = _repositoryManager.CompanyRepository.FindByCondition(
                x => x.CompanyId == companyId && x.AccountId == accountId,
                trackChanges)
                .FirstOrDefault();
            if (companyEntity == null)
                throw new NotFoundException("No company found with id " + companyId);

            return companyEntity;
        }

        public CompanyDetailResponseDto FindByCompanyId(Guid companyId, FindByCompanyIdRequestDto dto)
        {
            var companyEntity = findByCompanyIdIfExists(companyId, dto.AccountId, false);
            var companyDto = _mapper.Map<CompanyDetailResponseDto>(companyEntity);
            companyDto.BranchCount = _branchService.CountByCompanyId(companyId);
            return companyDto;
        }

        public IEnumerable<CompanyResponseDto> FindAll(FindAllCompaniesRequestDto? dto)
        {
            if (dto == null) throw new BadRequestException("User not logged in");

            var companyEntities = _repositoryManager.CompanyRepository.FindByCondition(
                x => x.AccountId == dto.AccountId,
                trackChanges: false);
            var companyDtos = _mapper.Map<IEnumerable<CompanyResponseDto>>(companyEntities);
            return companyDtos;
        }

        public void Update(Guid companyId, UpdateCompanyRequestDto dto)
        {
            var companyEntity = findByCompanyIdIfExists(companyId, dto.AccountId, true);
            _mapper.Map(dto, companyEntity);
            _repositoryManager.Save();
        }

        public ApiOkPagedResponse<IEnumerable<CompanyResponseDto>, MetaData>
            Search(SearchCompaniesRequestDto dto)
        {
            var companyPagedEntities = _repositoryManager.CompanyRepository.
                SearchCompanies(dto, false);
            var companyDtos = _mapper.Map<IEnumerable<CompanyResponseDto>>(companyPagedEntities);
            return new ApiOkPagedResponse<IEnumerable<CompanyResponseDto>, MetaData>(companyDtos,
                companyPagedEntities.MetaData);
        }
    }
}
