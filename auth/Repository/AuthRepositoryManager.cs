using auth.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace auth.Repository
{
    public class AuthRepositoryManager : IAuthRepositoryManager
    {
        private readonly AuthDbContext _context;
        private readonly Lazy<IUserRepository> _userRepository;
        private readonly Lazy<IAccountRepository> _accountRepository;

        public AuthRepositoryManager(AuthDbContext context)
        {
            _context = context;
            _userRepository = new Lazy<IUserRepository>(() =>
                new UserRepository(context));
            _accountRepository = new Lazy<IAccountRepository>(() =>
                new AccountRepository(context));
        }

        public IUserRepository UserRepository => _userRepository.Value;

        public IAccountRepository AccountRepository => _accountRepository.Value;

        public void Save()
        {
            _context.SaveChanges();
        }
    }
}
