using AutoMapper;
using Common.Models.Exceptions;
using Common.Models.Request;
using Common.Models.Response;
using hr.Dtos.Designation;
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
    public class DesignationService : IDesignationService
    {
        private readonly IHrRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;

        public DesignationService(IMapper mapper, 
            IHrRepositoryManager repositoryManager)
        {
            _mapper = mapper;
            _repositoryManager = repositoryManager;
        }

        public int Count(Guid accountId)
        {
            var count = _repositoryManager.DesignationRepository.FindByCondition(
                x => x.AccountId == accountId,
                trackChanges: false)
                .Count();
            return count;
        }

        public DesignationResponseDto Create(CreateDesignationRequestDto dto)
        {
            var designationEntity = _mapper.Map<Designation>(dto);
            _repositoryManager.DesignationRepository.Create(designationEntity);
            _repositoryManager.Save();
            return _mapper.Map<DesignationResponseDto>(designationEntity);
        }

        public void Delete(Guid designationId, DeleteDesignationRequestDto dto)
        {
            var designationEntity = findByDesignationIdIfExists(designationId, dto.AccountId, true);
            _repositoryManager.DesignationRepository.Delete(designationEntity);
            _repositoryManager.Save();
        }

        private Designation findByDesignationIdIfExists(Guid designationId, Guid? accountId, bool trackChanges)
        {
            var designationEntity = _repositoryManager.DesignationRepository.FindByCondition(
                x => x.DesignationId == designationId && x.AccountId == accountId,
                trackChanges
                )
                .FirstOrDefault();
            if (designationEntity == null)
                throw new NotFoundException("No department found with id " + designationId);

            return designationEntity;
        }

        public DesignationResponseDto FindByDesignationId(Guid designationId, FindByDesignationIdRequestDto dto)
        {
            var designationEntity = findByDesignationIdIfExists(designationId, dto.AccountId, false);
            var designationDto = _mapper.Map<DesignationResponseDto>(designationEntity);
            return designationDto;
        }

        public ApiOkPagedResponse<IEnumerable<DesignationResponseDto>, MetaData> Search(SearchDesignationRequestDto dto)
        {
            var designationPagedEntities = _repositoryManager.DesignationRepository.
                SearchDesignations(dto, false);
            var designationDtos = _mapper.Map<IEnumerable<DesignationResponseDto>>(designationPagedEntities);
            return new ApiOkPagedResponse<IEnumerable<DesignationResponseDto>, MetaData>(designationDtos,
                designationPagedEntities.MetaData);
        }

        public void Update(Guid designationId, UpdateDesignationRequestDto dto)
        {
            var designationEntity = findByDesignationIdIfExists(designationId, dto.AccountId, true);
            _mapper.Map(dto, designationEntity);
            _repositoryManager.Save();
        }
    }
}
