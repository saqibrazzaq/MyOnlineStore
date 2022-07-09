using cities.Dtos.City;
using Common.Models.Request;
using Common.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cities.Services
{
    public interface ICityService
    {
        CityDetailResponseDto FindById(Guid cityId);
        ApiOkPagedResponse<IEnumerable<CityResponseDto>, MetaData> Search(
            SearchCityRequestDto dto);
        void Create(CreateCityRequestDto dto);
        void Update(Guid cityId, UpdateCityRequestDto dto);
        void Delete(Guid cityId);
    }
}
