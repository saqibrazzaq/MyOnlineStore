using cities.Data;
using cities.Dtos.City;
using cities.Entities;
using Common.Models.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cities.Repository
{
    public class CityRepository : CitiesRepositoryBase<City>, ICityRepository
    {
        public CityRepository(CitiesDbContext context) : base(context)
        {
        }

        public PagedList<City> SearchCities(
            SearchCityRequestDto dto, bool trackChanges)
        {
            var cityEntities = FindAll(trackChanges)
                .Search(dto)
                .Sort(dto.OrderBy)
                .Skip((dto.PageNumber - 1) * dto.PageSize)
                .Take(dto.PageSize)
                .ToList();
            var count = FindAll(trackChanges: false)
                .Search(dto)
                .Count();
            return new PagedList<City>(cityEntities, count,
                dto.PageNumber, dto.PageSize);
        }
    }
}
