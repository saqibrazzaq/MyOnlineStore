using cities.Data;
using cities.Dtos.TimeZone;
using Common.Models.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cities.Repository
{
    public class TimeZoneRepository : CitiesRepositoryBase<Entities.TimeZone>, ITimeZoneRepository
    {
        public TimeZoneRepository(CitiesDbContext context) : base(context)
        {
        }

        public PagedList<Entities.TimeZone> SearchTimeZones(
            SearchTimeZoneRequestDto dto, bool trackChanges)
        {
            var timeZoneEntities = FindAll(trackChanges)
                .Search(dto)
                .Sort(dto.OrderBy)
                .Skip((dto.PageNumber - 1) * dto.PageSize)
                .Take(dto.PageSize)
                .ToList();
            var count = FindAll(trackChanges: false)
                .Search(dto)
                .Count();
            return new PagedList<Entities.TimeZone>(timeZoneEntities, count,
                dto.PageNumber, dto.PageSize);
        }
    }
}
