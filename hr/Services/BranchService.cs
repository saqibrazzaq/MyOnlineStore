using AutoMapper;
using Common.Models.Request;
using Common.Models.Response;
using hr.Dtos.Branch;
using hr.Entities;
using hr.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace hr.Services
{
    public class BranchService : IBranchService
    {
        private readonly IHrRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public BranchService(IHrRepositoryManager repositoryManager,
            IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }
        public BranchDetailResponseDto Create(CreateBranchRequestDto dto)
        {
            var branchEntity = _mapper.Map<Branch>(dto);
            _repositoryManager.BranchRepository.Create(branchEntity);
            _repositoryManager.Save();
            return _mapper.Map<BranchDetailResponseDto>(branchEntity);
        }

        public void Delete(Guid branchId, DeleteBranchRequestDto dto)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<BranchResponseDto> FindAll(FindAllBranchesRequestDto dto)
        {
            throw new NotImplementedException();
        }

        public BranchDetailResponseDto FindByBranchId(Guid branchId, FindByBranchIdRequestDto dto)
        {
            throw new NotImplementedException();
        }

        public ApiOkPagedResponse<IEnumerable<BranchResponseDto>, MetaData> Search(SearchBranchesRequestDto dto)
        {
            throw new NotImplementedException();
        }

        public void Update(Guid branchId, UpdateBranchRequestDto dto)
        {
            throw new NotImplementedException();
        }
    }
}
