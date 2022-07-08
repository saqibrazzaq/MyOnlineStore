using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace auth.Repository
{
    public interface IAuthRepositoryManager
    {
        IUserRepository UserRepository { get; }
        IAccountRepository AccountRepository { get; }
        Task SaveAsync();
    }
}
