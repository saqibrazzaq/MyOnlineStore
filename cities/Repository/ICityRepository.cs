﻿using cities.Dtos.City;
using cities.Entities;
using Common.Models.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cities.Repository
{
    public interface ICityRepository : ICitiesRepositoryBase<City>
    {
        PagedList<City> SearchCities(
            SearchCityRequestDto dto, bool trackChanges);
    }
}
