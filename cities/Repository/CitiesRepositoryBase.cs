using cities.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace cities.Repository
{
    public class CitiesRepositoryBase<T> : ICitiesRepositoryBase<T> where T : class
    {
        protected CitiesDbContext context;

        public CitiesRepositoryBase(CitiesDbContext context)
        {
            this.context = context;
        }

        public void Create(T entity)
        {
            context.Set<T>().Add(entity);
        }

        public void Delete(T entity)
        {
            context.Set<T>().Remove(entity);
        }

        public IQueryable<T> FindAll(bool trackChanges) =>
            !trackChanges ?
              context.Set<T>()
                .AsNoTracking() :
              context.Set<T>();

        public IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression,
        bool trackChanges,
        Func<IQueryable<T>, IIncludableQueryable<T, object>>? include = null)
        {
            // Get query
            IQueryable<T> query = context.Set<T>();

            // Apply filter
            query = query.Where(expression);

            // Include
            if (include != null)
            {
                query = include(query);
            }

            // Tracking
            if (!trackChanges)
                query.AsNoTracking();

            return query;
        }
    }
}
