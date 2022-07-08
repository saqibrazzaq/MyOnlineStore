using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cities.Repository
{
    public interface ICitiesRepositoryManager
    {
        ICountryRepository CountryRepository { get; }
        IStateRepository StateRepository { get; }
        ITimeZoneRepository TimeZoneRepository { get; }
        ICityRepository CityRepository { get; }
        void Save();
    }
}
