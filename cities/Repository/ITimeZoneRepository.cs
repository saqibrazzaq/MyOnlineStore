using cities.Dtos.TimeZone;
using Common.Models.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cities.Repository
{
    public interface ITimeZoneRepository : ICitiesRepositoryBase<Entities.TimeZone>
    {
        PagedList<Entities.TimeZone> SearchTimeZones(
            SearchTimeZoneRequestDto dto, bool trackChanges);
    }
}
