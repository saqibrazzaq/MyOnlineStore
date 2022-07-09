using AutoMapper;
using cities.Repository;
using logger;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace cities.Services
{
    public class CitiesDataSeedService : ICitiesDataSeedService
    {
        private readonly ICitiesRepositoryManager _repository;
        private readonly IMapper _mapper;
        private readonly ILoggerManager _logger;

        public CitiesDataSeedService(ICitiesRepositoryManager repository, 
            IMapper mapper, 
            ILoggerManager logger)
        {
            _repository = repository;
            _mapper = mapper;
            _logger = logger;
        }

        public void Seed()
        {
            ResetCityStateCountries();

            _logger.LogInfo("Reset complete.");
        }

        private void ResetCityStateCountries()
        {
            _logger.LogInfo("Going to reset country, state, city, time zones....");

            if (SeedDataAlreadyExists() == true)
                return;

            DeleteAllData();
            ImportAllData();
        }

        private bool SeedDataAlreadyExists()
        {
            bool dataAlreadyExists = false;

            // Check country data
            var countriesCount = _repository.CountryRepository.FindAll(false).Count();
            var statesCount = _repository.StateRepository.FindAll(false).Count();
            var citiesCount = _repository.CityRepository.FindAll(false).Count();
            var timeZonesCount = _repository.TimeZoneRepository.FindAll(false).Count();

            if (countriesCount > 200 && statesCount > 4000 && citiesCount > 130000 && timeZonesCount > 300)
            {
                dataAlreadyExists = true;
                _logger.LogInfo("Data already exists. No need to seed.");
            }

            return dataAlreadyExists;
        }

        private void ImportAllData()
        {
            _logger.LogInfo("Importing data....");

            var file = Path.Combine(Directory.GetCurrentDirectory(), "Data", "countries+states+cities.json");
            if (File.Exists(file))
            {
                Console.WriteLine("Found json file");

                string jsonString = File.ReadAllText(file);
                var countries = JsonSerializer.Deserialize<Models.DataSeed.Cities.Country[]>(jsonString);
                var countriesEntity = _mapper.Map<Entities.Country[]>(countries);
                foreach (var countryEntity in countriesEntity)
                {
                    _repository.CountryRepository.Create(countryEntity);
                }
                _repository.Save();
                Console.WriteLine(countries.Length + " countries imported.");
            }

            _logger.LogInfo("Import data complete.");
        }

        private void DeleteAllData()
        {
            _logger.LogInfo("Deleting data for reset...."); ;

            foreach (var tzEntity in _repository.TimeZoneRepository.FindAll(trackChanges: true))
            {
                _repository.TimeZoneRepository.Delete(tzEntity);
            }
            _repository.Save();

            foreach (var cityEntity in _repository.CityRepository.FindAll(trackChanges: true))
            {
                _repository.CityRepository.Delete(cityEntity);
            }
            _repository.Save();

            foreach (var stateEntity in _repository.StateRepository.FindAll(trackChanges: true))
            {
                _repository.StateRepository.Delete(stateEntity);
            }
            _repository.Save();

            foreach (var countryEntity in _repository.CountryRepository.FindAll(trackChanges: true))
            {
                _repository.CountryRepository.Delete(countryEntity);
            }
            _repository.Save();

            _logger.LogInfo("Delete complete");
        }
    }
}
