import { Route, Routes } from "react-router-dom";
import AccountLayout from "./components/layout/AccountLayout";
import AdminLayout from "./components/layout/AdminLayout";
import Layout from "./components/layout/Layout";
import PersistLogin from "./hooks/PersistLogin";
import RequireAuth from "./hooks/RequireAuth";
import AccountHome from "./pages/Account/AccountHome";
import AdminHome from "./pages/Admin/AdminHome";
import AdminListUsers from "./pages/Admin/Users/AdminListUsers";
import RegisterAdmin from "./pages/Admin/Users/RegisterAdmin";
import ChangePassword from "./pages/Account/ChangePassword";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import UnAuthorized from "./pages/auth/UnAuthorized";
import VerifyAccount from "./pages/Account/VerifyAccount";
import DeleteUser from "./pages/Admin/Users/DeleteUser";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import SignOut from "./pages/auth/SignOut";
import ProfilePicture from "./pages/Account/ProfilePicture";
import AdminUsersLayout from "./components/layout/AdminUsersLayout";
import AdminUsersHome from "./pages/Admin/Users/AdminUsersHome";
import AdminCompanyLayout from "./components/layout/AdminCompanyLayout";
import AdminCompanyHome from "./pages/Admin/Company/AdminCompanyHome";
import AdminListCompanies from "./pages/Admin/Company/AdminListCompanies";
import AdminUpdateCompany from "./pages/Admin/Company/AdminUpdateCompany";
import AdminDeleteCompany from "./pages/Admin/Company/AdminDeleteCompany";
import AdminListBranches from "./pages/Admin/Branch/AdminListBranches";
import AdminUpdateBranch from "./pages/Admin/Branch/AdminUpdateBranch";
import AdminDeleteBranch from "./pages/Admin/Branch/AdminDeleteBranch";
import AdminListDepartments from "./pages/Admin/Department/AdminListDepartments";
import AdminUpdateDepartment from "./pages/Admin/Department/AdminUpdateDepartment";
import AdminDeleteDepartment from "./pages/Admin/Department/AdminDeleteDepartment";
import AdminListDesignation from "./pages/Admin/Designation/AdminListDesignation";
import AdminUpdateDesignation from "./pages/Admin/Designation/AdminUpdateDesignation";
import AdminDeleteDesignation from "./pages/Admin/Designation/AdminDeleteDesignation";
import AdminListEmployees from "./pages/Admin/Employee/AdminListEmployees";
import AdminUpdateEmployee from "./pages/Admin/Employee/AdminUpdateEmployee";
import AdminDeleteEmployee from "./pages/Admin/Employee/AdminDeleteEmployee";

export const App = () => {
  enum Roles {
    Admin = "Admin",
    Manager = "Manager",
    User = "User",
    Owner = "Owner",
  }
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public routes */}
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<SignOut />} />
        <Route path="register" element={<SignUp />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="unauthorized" element={<UnAuthorized />} />

        {/* Admin Only routes */}
        <Route element={<PersistLogin />}>
          <Route
            element={
              <RequireAuth
                allowedRoles={[Roles.Owner, Roles.Admin, Roles.Manager]}
              />
            }
          >
            <Route path="admin" element={<AdminLayout />}>
              <Route index element={<AdminHome />} />
              <Route path="users" />
              <Route path="company" />
            </Route>
            <Route path="admin/users" element={<AdminUsersLayout />}>
              <Route index element={<AdminListUsers />} />
              <Route path="list" element={<AdminListUsers />} />
              <Route path="register-admin" element={<RegisterAdmin />} />
              <Route path="delete/:username" element={<DeleteUser />} />
            </Route>
            <Route path="admin/company" element={<AdminCompanyLayout />}>
              <Route index element={<AdminListCompanies />} />
              <Route path="list" element={<AdminListCompanies />} />
              <Route path="update" element={<AdminUpdateCompany />} />
              <Route path="update/:companyId" element={<AdminUpdateCompany />} />
              <Route path="delete/:companyId" element={<AdminDeleteCompany />} />
              <Route path="branches/list" element={<AdminListBranches />} />
              <Route path="branches/update" element={<AdminUpdateBranch />} />
              <Route path="branches/update/:branchId" element={<AdminUpdateBranch />} />
              <Route path="branches/delete/:branchId" element={<AdminDeleteBranch />} />
              <Route path="departments/list/:branchId" element={<AdminListDepartments />} />
              <Route path="departments/update" element={<AdminUpdateDepartment />} />
              <Route path="departments/update/:departmentId" element={<AdminUpdateDepartment />} />
              <Route path="departments/delete/:departmentId" element={<AdminDeleteDepartment />} />
              <Route path="designations/list" element={<AdminListDesignation />} />
              <Route path="designations/update" element={<AdminUpdateDesignation />} />
              <Route path="designations/update/:designationId" element={<AdminUpdateDesignation />} />
              <Route path="designations/delete/:designationId" element={<AdminDeleteDesignation />} />
              <Route path="employees/list" element={<AdminListEmployees />} />
              <Route path="employees/update" element={<AdminUpdateEmployee />} />
              <Route path="employees/update/:employeeId" element={<AdminUpdateEmployee />} />
              <Route path="employees/delete/:employeeId" element={<AdminDeleteEmployee />} />
            </Route>
          </Route>
        </Route>

        {/* Manager ONLY routes */}

        {/* All roles routes */}
        <Route
          element={
            <RequireAuth
              allowedRoles={[
                Roles.Owner,
                Roles.Admin,
                Roles.Manager,
                Roles.User,
              ]}
            />
          }
        >
          <Route path="account" element={<AccountLayout />}>
            <Route index element={<AccountHome />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="profile-picture" element={<ProfilePicture />} />
            <Route path="verification-status" element={<VerifyAccount />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};
