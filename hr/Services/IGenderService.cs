using hr.Dtos.Gender;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace hr.Services
{
    public interface IGenderService
    {
        IEnumerable<GenderResponseDto> FindAll();
        GenderResponseDto FindByGenderCode(string genderCode);
    }
}
