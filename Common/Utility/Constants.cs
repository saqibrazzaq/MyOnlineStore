using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Utility
{
    public class Constants
    {
        public const string OwnerRole = "Owner";
        public const string AdminRole = "Admin";
        public const string ManagerRole = "Manager";
        public const string UserRole = "User";

        // For controller attributes
        public const string AllRoles = OwnerRole + "," + AdminRole + "," + ManagerRole + "," + UserRole;
        public const string AllAdminRoles = OwnerRole + "," + AdminRole;

        public const string RefreshTokenCookieName = "refreshToken";

        public const string TempFolderName = "temp";
        public const string CloudinaryFolderName = "mypizzastore/profile";
    }
}
