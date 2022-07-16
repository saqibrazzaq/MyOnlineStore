using hr.Entities;
using hr.Repository;
using logger;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace hr.Services
{
    public class HrDataSeedService : IHrDataSeedService
    {
        private readonly ILoggerManager _logger;
        private readonly IHrRepositoryManager _repositoryManager;

        public HrDataSeedService(ILoggerManager logger, 
            IHrRepositoryManager repositoryManager)
        {
            _logger = logger;
            _repositoryManager = repositoryManager;
        }

        public void Seed()
        {
            _logger.LogInfo("Seeding data for hr database...");
            SeedGender();
            _logger.LogInfo("Finished.");
        }

        private void SeedGender()
        {
            var count = _repositoryManager.GenderRepository.FindAll(false).Count();
            if (count == 0)
            {
                _repositoryManager.GenderRepository.Create(new Gender { GenderCode = 'M', Name = "Male" });
                _repositoryManager.GenderRepository.Create(new Gender { GenderCode = 'F', Name = "Female" });
                _repositoryManager.Save();
            }
        }
    }
}
