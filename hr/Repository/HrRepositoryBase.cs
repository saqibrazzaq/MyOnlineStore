using hr.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace hr.Repository
{
    public class HrRepositoryBase<T> : IHrRepositoryBase<T> where T : class
    {
        protected HrDbContext _context;

        public HrRepositoryBase(HrDbContext context)
        {
            _context = context;
        }

        public void Create(T entity)
        {
            _context.Set<T>().Add(entity);
        }

        public void Delete(T entity)
        {
            _context.Set<T>().Remove(entity);
        }

        public IQueryable<T> FindAll(bool trackChanges) =>
            !trackChanges ?
              _context.Set<T>()
                .AsNoTracking() :
              _context.Set<T>();

        public IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression,
        bool trackChanges,
        Func<IQueryable<T>, IIncludableQueryable<T, object>>? include = null)
        {
            // Get query
            IQueryable<T> query = _context.Set<T>();

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
