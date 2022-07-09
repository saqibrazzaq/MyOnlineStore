using AutoMapper;
using cities.Dtos.TimeZone;
using cities.Repository;
using Common.Models.Exceptions;
using Common.Models.Request;
using Common.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cities.Services
{
    public class TimeZoneService : ITimeZoneService
    {
        private readonly ICitiesRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;

        public TimeZoneService(ICitiesRepositoryManager repositoryManager,
            IMapper mapper,
            ICountryService countryService)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public void Create(CreateTimeZoneRequestDto dto)
        {
            var timeZoneEntity = _mapper.Map<Entities.TimeZone>(dto);
            _repositoryManager.TimeZoneRepository.Create(timeZoneEntity);
            _repositoryManager.Save();
        }

        public void Delete(Guid timeZoneId)
        {
            var timeZoneEntity = GetTimeZoneIfExists(timeZoneId, true);

            _repositoryManager.TimeZoneRepository.Delete(timeZoneEntity);
            _repositoryManager.Save();
        }

        public IEnumerable<TimeZoneResponseDto> FindAll()
        {
            var timeZoneEntities = _repositoryManager.TimeZoneRepository.FindAll(false);
            var timeZoneDtos = _mapper.Map<IEnumerable<TimeZoneResponseDto>>(timeZoneEntities);
            return timeZoneDtos;
        }

        public TimeZoneResponseDto FindByTimeZoneId(Guid timeZoneId)
        {
            var timeZoneEntity = GetTimeZoneIfExists(timeZoneId, false);
            var timeZoneDto = _mapper.Map<TimeZoneResponseDto>(timeZoneEntity);
            return timeZoneDto;
        }

        private Entities.TimeZone GetTimeZoneIfExists(Guid timeZoneId, bool trackChanges)
        {
            var timeZoneEntity = _repositoryManager.TimeZoneRepository.FindByCondition(
                x => x.TimeZoneId == timeZoneId, trackChanges)
                .FirstOrDefault();

            if (timeZoneEntity == null)
                throw new NotFoundException("No TimeZone found with id " + timeZoneId);

            return timeZoneEntity;
        }

        public void Update(Guid timeZoneId, UpdateTimeZoneRequestDto dto)
        {
            var timeZoneEntity = GetTimeZoneIfExists(timeZoneId, true);
            _mapper.Map(dto, timeZoneEntity);
            _repositoryManager.Save();
        }

        public IEnumerable<TimeZoneResponseDto> FindByCountryId(
            Guid countryId)
        {
            if (countryId == Guid.Empty)
                throw new BadRequestException("Invalid country id " + countryId);

            var timeZoneEntities = _repositoryManager.TimeZoneRepository.FindByCondition(
                x => x.CountryId == countryId, trackChanges: false);
            var timeZoneDtos = _mapper.Map<IEnumerable<TimeZoneResponseDto>>(timeZoneEntities);
            return timeZoneDtos;
        }

        public IEnumerable<TimeZoneResponseDto> FindByCountryCode(
            string countryCode)
        {
            var countryId = _repositoryManager.CountryRepository.FindByCondition(
                x => x.CountryCode == countryCode, trackChanges: false)
                .Select(x => x.CountryId)
                .FirstOrDefault();
            if (countryId == Guid.Empty)
                throw new NotFoundException("No time zones found with country code " + countryCode);

            return FindByCountryId(countryId);
        }

        public ApiOkPagedResponse<IEnumerable<TimeZoneResponseDto>, MetaData>
            SearchTimeZones(SearchTimeZoneRequestDto dto)
        {
            var timeZonePagedEntities = _repositoryManager.TimeZoneRepository.SearchTimeZones(
                dto, trackChanges: false);
            var timeZoneDtos = _mapper.Map<IEnumerable<TimeZoneResponseDto>>(timeZonePagedEntities);
            return new ApiOkPagedResponse<IEnumerable<TimeZoneResponseDto>, MetaData>(
                timeZoneDtos, timeZonePagedEntities.MetaData);
        }
    }
}
