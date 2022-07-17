using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Utility
{
    public static class DateTimeUtils
    {
        public static int CalculateAge(DateTime? dateOfBirth)
        {
            if (dateOfBirth == null) return 0;

            DateTime bd = (DateTime)dateOfBirth;
            int age = DateTime.Now.Year - bd.Year;
            if (DateTime.Now.DayOfYear < bd.DayOfYear)
                age--;

            return age;
        }
    }
}
