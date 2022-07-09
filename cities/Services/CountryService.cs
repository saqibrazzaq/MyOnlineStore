using AutoMapper;
using cities.Dtos.Country;
using cities.Entities;
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
    public class CountryService : ICountryService
    {
        private readonly ICitiesRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;

        public CountryService(ICitiesRepositoryManager repositoryManager,
            IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public void Create(CreateCountryRequestDto dto)
        {
            var countryEntity = _mapper.Map<Country>(dto);
            _repositoryManager.CountryRepository.Create(countryEntity);
            _repositoryManager.Save();
        }

        public IEnumerable<CountryResponseDto> FindAll()
        {
            var countryEntities = _repositoryManager.CountryRepository.FindAll(trackChanges: false);
            var countryDtos = _mapper.Map<IEnumerable<CountryResponseDto>>(countryEntities);
            return countryDtos;
        }

        public CountryDetailResponseDto FindByCountryId(Guid countryId)
        {
            var countryEntity = GetCountryIfExists(countryId, false);

            var countryDto = _mapper.Map<CountryDetailResponseDto>(countryEntity);
            return countryDto;
        }

        private Country GetCountryIfExists(Guid countryId, bool trackChanges)
        {
            var countryEntity = _repositoryManager.CountryRepository.FindByCondition(
                expression: x => x.CountryId == countryId,
                trackChanges)
                .FirstOrDefault();

            if (countryEntity == null)
                throw new NotFoundException("No country found with id " + countryId);

            return countryEntity;
        }

        public CountryDetailResponseDto FindByCountryCode(string countryCode)
        {
            var countryEntity = _repositoryManager.CountryRepository.FindByCondition(
                expression: x => x.CountryCode == countryCode,
                trackChanges: false)
                .FirstOrDefault();

            if (countryEntity == null)
                throw new NotFoundException("No country found with code " + countryCode);

            var countryDto = _mapper.Map<CountryDetailResponseDto>(countryEntity);
            return countryDto;
        }

        public void Update(Guid countryId, UpdateCountryRequestDto dto)
        {
            var countryEntity = GetCountryIfExists(countryId, true);
            _mapper.Map(dto, countryEntity);
            _repositoryManager.Save();
        }

        public void Delete(Guid countryId)
        {
            var countryEntity = GetCountryIfExists(countryId, true);
            _repositoryManager.CountryRepository.Delete(countryEntity);
            _repositoryManager.Save();
        }

        public ApiOkPagedResponse<IEnumerable<CountryResponseDto>, MetaData> Search(SearchCountryRequestDto dto)
        {
            var countryPagedEntities = _repositoryManager.CountryRepository.SearchCountries(dto, false);
            var countryDtos = _mapper.Map<IEnumerable<CountryResponseDto>>(countryPagedEntities);
            return new ApiOkPagedResponse<IEnumerable<CountryResponseDto>, MetaData>(
                countryDtos, countryPagedEntities.MetaData);
        }
    }
}
