using cities.Dtos.Country;
using Common.Models.Request;
using Common.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cities.Services
{
    public interface ICountryService
    {
        IEnumerable<CountryResponseDto> FindAll();
        CountryDetailResponseDto FindByCountryCode(string countryCode);
        CountryDetailResponseDto FindByCountryId(Guid countryId);
        void Create(CreateCountryRequestDto dto);
        void Update(Guid countryId, UpdateCountryRequestDto dto);
        void Delete(Guid countryId);
        ApiOkPagedResponse<IEnumerable<CountryResponseDto>, MetaData> 
            Search(SearchCountryRequestDto dto);
    }
}
