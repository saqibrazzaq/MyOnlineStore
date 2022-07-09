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
        public CompanyService(IHrRepositoryManager repositoryManager,
            IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public CompanyDetailResponseDto Create(CreateCompanyRequestDto dto)
        {
            var companyEntity = _mapper.Map<Entities.Company>(dto);
            _repositoryManager.CompanyRepository.Create(companyEntity);
            _repositoryManager.Save();
            return _mapper.Map<CompanyDetailResponseDto>(companyEntity);
        }

        public void Delete(Guid companyId)
        {
            var companyEntity = findByCompanyIdIfExists(companyId, true);
            _repositoryManager.CompanyRepository.Delete(companyEntity);
            _repositoryManager.Save();
        }

        private Entities.Company findByCompanyIdIfExists(Guid companyId, bool trackChanges)
        {
            var companyEntity = _repositoryManager.CompanyRepository.FindByCondition(
                x => x.CompanyId == companyId,
                trackChanges)
                .FirstOrDefault();
            if (companyEntity == null)
                throw new NotFoundException("No company found with id " + companyId);

            return companyEntity;
        }

        public CompanyDetailResponseDto FindByCompanyId(Guid companyId)
        {
            var companyEntity = findByCompanyIdIfExists(companyId, false);
            var companyDto = _mapper.Map<CompanyDetailResponseDto>(companyEntity);
            return companyDto;
        }

        public IEnumerable<CompanyResponseDto> FindAll()
        {
            var companyEntities = _repositoryManager.CompanyRepository.FindAll(
                trackChanges: false);
            var companyDtos = _mapper.Map<IEnumerable<CompanyResponseDto>>(companyEntities);
            return companyDtos;
        }

        public void Update(Guid companyId, UpdateCompanyRequestDto dto)
        {
            var companyEntity = findByCompanyIdIfExists(companyId, true);
            _mapper.Map(dto, companyEntity);
            _repositoryManager.Save();
        }

        public ApiOkPagedResponse<IEnumerable<CompanyResponseDto>, MetaData>
            Search(SearchCompaniesRequestDto dto)
        {
            var companyPagedEntities = _repositoryManager.CompanyRepository.SearchCompanies(dto, false);
            var companyDtos = _mapper.Map<IEnumerable<CompanyResponseDto>>(companyPagedEntities);
            return new ApiOkPagedResponse<IEnumerable<CompanyResponseDto>, MetaData>(companyDtos,
                companyPagedEntities.MetaData);
        }
    }
}
