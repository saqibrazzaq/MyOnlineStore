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
