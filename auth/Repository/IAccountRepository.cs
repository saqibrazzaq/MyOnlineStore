﻿using auth.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace auth.Repository
{
    public interface IAccountRepository : IAuthRepositoryBase<Account>
    {
    }
}
