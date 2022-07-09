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

        public HrDataSeedService(ILoggerManager logger)
        {
            _logger = logger;
        }

        public void Seed()
        {
            _logger.LogInfo("No seed data for Hr.");
        }
    }
}
