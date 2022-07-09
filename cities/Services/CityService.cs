using AutoMapper;
using cities.Dtos.City;
using cities.Entities;
using cities.Repository;
using Common.Models.Exceptions;
using Common.Models.Request;
using Common.Models.Response;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cities.Services
{
    public class CityService : ICityService
    {
        private readonly ICitiesRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;

        public CityService(ICitiesRepositoryManager repositoryManager,
            IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public void Create(CreateCityRequestDto dto)
        {
            var cityEntity = _mapper.Map<City>(dto);
            _repositoryManager.CityRepository.Create(cityEntity);
            _repositoryManager.Save();
        }

        public void Delete(Guid cityId)
        {
            var cityEntity = FindByIdIfExists(cityId, true);
            _repositoryManager.CityRepository.Delete(cityEntity);
            _repositoryManager.Save();
        }

        private City FindByIdIfExists(Guid cityId, bool trackChanges)
        {
            var cityEntity = _repositoryManager.CityRepository.FindByCondition(
                x => x.CityId == cityId, trackChanges)
                .FirstOrDefault();
            if (cityEntity == null)
                throw new NotFoundException("No city found with id " + cityId);

            return cityEntity;
        }

        public CityDetailResponseDto FindById(Guid cityId)
        {
            var cityEntity = _repositoryManager.CityRepository.FindByCondition(
                x => x.CityId == cityId,
                trackChanges: false,
                include: i => i.Include(x => x.State.Country))
                .FirstOrDefault();
            if (cityEntity == null)
                throw new NotFoundException("No city found with id " + cityId);

            var cityDetailDto = _mapper.Map<CityDetailResponseDto>(cityEntity);
            return cityDetailDto;
        }

        public ApiOkPagedResponse<IEnumerable<CityResponseDto>, MetaData> Search(SearchCityRequestDto dto)
        {
            var cityPagedEntities = _repositoryManager.CityRepository.SearchCities(dto, false);
            var cityDtos = _mapper.Map<IEnumerable<CityResponseDto>>(cityPagedEntities);
            return new ApiOkPagedResponse<IEnumerable<CityResponseDto>, MetaData>(
                cityDtos, cityPagedEntities.MetaData);
        }

        public void Update(Guid cityId, UpdateCityRequestDto dto)
        {
            var cityEntity = FindByIdIfExists(cityId, true);
            _mapper.Map(dto, cityEntity);
            _repositoryManager.Save();
        }
    }
}
