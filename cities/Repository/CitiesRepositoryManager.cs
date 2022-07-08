using cities.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cities.Repository
{
    public class CitiesRepositoryManager : ICitiesRepositoryManager
    {
        private readonly CitiesDbContext _context;
        private readonly Lazy<ICountryRepository> _countryRepository;
        private readonly Lazy<ITimeZoneRepository> _timeZoneRepository;
        private readonly Lazy<IStateRepository> _stateRepository;
        private readonly Lazy<ICityRepository> _cityRepository;

        public CitiesRepositoryManager(CitiesDbContext context)
        {
            _context = context;
            _countryRepository = new Lazy<ICountryRepository>(() =>
                new CountryRepository(context));
            _timeZoneRepository = new Lazy<ITimeZoneRepository>(() =>
                new TimeZoneRepository(context));
            _cityRepository = new Lazy<ICityRepository>(() =>
                new CityRepository(context));
            _stateRepository = new Lazy<IStateRepository>(() =>
                new StateRepository(context));
        }

        public ICountryRepository CountryRepository => _countryRepository.Value;

        public IStateRepository StateRepository => _stateRepository.Value;

        public ITimeZoneRepository TimeZoneRepository => _timeZoneRepository.Value;

        public ICityRepository CityRepository => _cityRepository.Value;

        public void Save()
        {
            _context.SaveChanges();
        }
    }
}
