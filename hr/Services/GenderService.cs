using AutoMapper;
using Common.Models.Exceptions;
using hr.Dtos.Gender;
using hr.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace hr.Services
{
    public class GenderService : IGenderService
    {
        private readonly IHrRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public GenderService(IHrRepositoryManager repositoryManager, 
            IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public IEnumerable<GenderResponseDto> FindAll()
        {
            var genderEntities = _repositoryManager.GenderRepository.FindAll(false);
            var genderDtos = _mapper.Map<IEnumerable<GenderResponseDto>>(genderEntities);
            return genderDtos;
        }

        public GenderResponseDto FindByGenderCode(string genderCode)
        {
            var genderEntity = _repositoryManager.GenderRepository.FindByCondition(
                x => x.GenderCode == genderCode.Trim()[0],
                trackChanges: false)
                .FirstOrDefault();
            if (genderEntity == null)
                throw new NotFoundException("No gender found with code " + genderCode);

            return _mapper.Map<GenderResponseDto>(genderEntity);
        }
    }
}
