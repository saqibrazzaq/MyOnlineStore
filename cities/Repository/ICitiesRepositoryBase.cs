using Microsoft.EntityFrameworkCore.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace cities.Repository
{
    public interface ICitiesRepositoryBase<T>
    {
        IQueryable<T> FindAll(bool trackChanges);
        IQueryable<T> FindByCondition(
            Expression<Func<T, bool>> expression,
            bool trackChanges,
            Func<IQueryable<T>, IIncludableQueryable<T, object>>? include = null
            );
        void Create(T entity);
        void Delete(T entity);
    }
}
