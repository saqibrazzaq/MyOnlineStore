using Common.Models.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace hr.Dtos.Company
{
    public class FindAllCompaniesRequestDto : AccountDto
    {
        public FindAllCompaniesRequestDto(Guid? accountId)
        {
            AccountId = accountId;
        }
    }
}
