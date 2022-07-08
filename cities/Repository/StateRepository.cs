using cities.Data;
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
    public class StateRepository : CitiesRepositoryBase<State>, IStateRepository
    {
        public StateRepository(CitiesDbContext context) : base(context)
        {
        }

        public PagedList<State> SearchStates(
            SearchStateRequestDto dto, bool trackChanges)
        {
            var searchEntities = FindAll(trackChanges)
                .Search(dto)
                .Sort(dto.OrderBy)
                .Skip((dto.PageNumber - 1) * dto.PageSize)
                .Take(dto.PageSize)
                .ToList();
            var count = FindAll(trackChanges: false)
                .Search(dto)
                .Count();
            return new PagedList<State>(searchEntities, count,
                dto.PageNumber, dto.PageSize);
        }
    }
}
