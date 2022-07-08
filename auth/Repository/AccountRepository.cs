using auth.Data;
using auth.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace auth.Repository
{
    public class AccountRepository : AuthRepositoryBase<Account>, IAccountRepository
    {
        public AccountRepository(AuthDbContext context) : base(context)
        {
        }
    }
}
