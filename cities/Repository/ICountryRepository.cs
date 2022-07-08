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
    public interface ICountryRepository : ICitiesRepositoryBase<Country>
    {
        PagedList<Country> SearchCountries(SearchCountryRequestDto dto, bool trackChanges);
    }
}
