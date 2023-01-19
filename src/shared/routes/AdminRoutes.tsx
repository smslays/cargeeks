import { lazy } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import UsersIcon from "@mui/icons-material/People";
import VehicleIcon from "@mui/icons-material/CarRentalOutlined";
import PostIcon from "@mui/icons-material/Receipt";

const DashBoard = lazy(
  () => import("../../features/admin/dashBoard/DashBoard")
);
const Users = lazy(() => import("../../features/admin/users/Users"));
const Posts = lazy(() => import("../../features/admin/posts/Posts"));
const Vehicles = lazy(() => import("../../features/admin/vehicles/Vehicles"));
const ChangeUserPassword = lazy(
  () => import("../../features/admin/change-user-password/ChangeUserPassword")
);
const UserProfile = lazy(
  () => import("../../features/admin/profile/UserProfile")
);
const AddEditUser = lazy(
  () => import("../../features/admin/users/AddEditUser")
);
export default [
  {
    label: "DashBoard",
    component: <DashBoard />,
    path: "",
    showInMenu: true,
    icon: <DashboardIcon />,
    roles: ["superadmin", "admin", "customer"],
  },
  {
    label: "Users",
    component: <Users />,
    path: "users",
    showInMenu: true,
    icon: <UsersIcon />,
    roles: ["superadmin","admin"],
  },
  {
    label: "Customers",
    component: <Users />,
    path: "customers",
    showInMenu: true,
    icon: <UsersIcon />,
    roles: ["superadmin", "admin"],
  },
  {
    label: "Posts",
    component: <Posts />,
    path: "posts",
    showInMenu: true,
    icon: <PostIcon />,
    roles: ["superadmin", "admin", "customer"],
  },
  {
    label: "Vehicles",
    component: <Vehicles />,
    path: "vehicles",
    showInMenu: true,
    icon: <VehicleIcon />,
    roles: ["superadmin", "admin"],
  },
  {
    label: "Change Password",
    component: <ChangeUserPassword />,
    path: "change-password",
    showInMenu: false,
    icon: <PostIcon />,
    roles: ["superadmin", "admin", "customer"],
  },
  {
    label: "User Profile",
    component: <UserProfile />,
    path: "user-profile",
    showInMenu: false,
    icon: <UsersIcon />,
    roles: ["superadmin", "admin", "customer"],
  },
  {
    label: "Add Edit User",
    component: <AddEditUser />,
    path: "add-edit/:id/:op/:role",
    showInMenu: false,
    icon: <UsersIcon />,
    roles: ["superadmin", "admin"],
  },
];
