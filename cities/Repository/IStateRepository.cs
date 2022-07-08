using cities.Dtos.State;
using cities.Entities;
using Common.Models.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cities.Repository
{
    public interface IStateRepository : ICitiesRepositoryBase<State>
    {
        PagedList<State> SearchStates(SearchStateRequestDto dto, bool trackChanges);
    }
}
