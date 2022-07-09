using cities.Dtos.TimeZone;
using Common.Models.Request;
using Common.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cities.Services
{
    public interface ITimeZoneService
    {
        IEnumerable<TimeZoneResponseDto> FindAll();
        ApiOkPagedResponse<IEnumerable<TimeZoneResponseDto>, MetaData> SearchTimeZones(SearchTimeZoneRequestDto dto);
        TimeZoneResponseDto FindByTimeZoneId(Guid timeZoneId);
        IEnumerable<TimeZoneResponseDto> FindByCountryId(Guid countryId);
        IEnumerable<TimeZoneResponseDto> FindByCountryCode(string countryCode);
        void Create(CreateTimeZoneRequestDto dto);
        void Update(Guid timeZoneId, UpdateTimeZoneRequestDto dto);
        void Delete(Guid timeZoneId);
    }
}
