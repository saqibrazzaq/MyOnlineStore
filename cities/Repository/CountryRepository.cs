using cities.Data;
using cities.Dtos.Country;
using cities.Entities;
using Common.Models.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cities.Repository
{
    public class CountryRepository : CitiesRepositoryBase<Country>, ICountryRepository
    {
        public CountryRepository(CitiesDbContext context) : base(context)
        {
        }

        public PagedList<Country> SearchCountries(
            SearchCountryRequestDto dto, bool trackChanges)
        {
            var countryEntities = FindAll(trackChanges)
                .Search(dto)
                .Sort(dto.OrderBy)
                .Skip((dto.PageNumber - 1) * dto.PageSize)
                .Take(dto.PageSize)
                .ToList();
            var count = FindAll(trackChanges: false)
                .Search(dto)
                .Count();
            return new PagedList<Country>(countryEntities, count,
                dto.PageNumber, dto.PageSize);
        }
    }
}
