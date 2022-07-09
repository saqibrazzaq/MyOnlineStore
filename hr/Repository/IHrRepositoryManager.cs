using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace hr.Repository
{
    public interface IHrRepositoryManager
    {
        IBranchRepository BranchRepository { get; }
        ICompanyRepository CompanyRepository { get; }
        IDepartmentRepository DepartmentRepository { get; }
        IDesignationRepository DesignationRepository { get; }
        IEmployeeRepository EmployeeRepository { get; }
        IGenderRepository GenderRepository { get; }
        void Save();
    }
}
