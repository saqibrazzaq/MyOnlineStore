using cities.Dtos.State;
using Common.Models.Request;
using Common.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cities.Services
{
    public interface IStateService
    {
        StateResponseDto FindById(Guid stateId);
        StateResponseDto FindByStateCode(string stateCode);
        IEnumerable<StateResponseDto> FindByCountryCode(string countryCode);
        IEnumerable<StateResponseDto> FindByCountryId(Guid countryId);
        ApiOkPagedResponse<IEnumerable<StateResponseDto>, MetaData> 
            Search(SearchStateRequestDto dto);
        void Create(CreateStateRequestDto dto);
        void Update(Guid stateId, UpdateStateRequestDto dto);
        void Delete(Guid stateId);
    }
}
