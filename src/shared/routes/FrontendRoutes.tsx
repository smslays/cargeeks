import { lazy } from "react";

const Home = lazy(() => import("../../features/frontend/home/Home"));
const BuyUsed = lazy(() => import("../../features/frontend/buy-used/BuyUsed"));
const SellCar = lazy(() => import("../../features/frontend/sell-car/SellCar"));
const Register = lazy(() => import("../../features/frontend/auth/Register"));
const Login = lazy(() => import("../../features/frontend/auth/Login"));
const ForgotPassword = lazy(
  () => import("../../features/frontend/auth/ForgotPassword")
);
const ChangePassword = lazy(
  () => import("../../features/frontend/auth/ChangePassword")
);

export default [
  {
    label: "Home",
    component: <Home />,
    path: "",
    showInMenu: true,
    hasAuthenticate: "all",
  },
  {
    label: "Buy Used Cars",
    component: <BuyUsed />,
    path: "buy-used-cars",
    showInMenu: true,
    hasAuthenticate: "all",
  },
  {
    label: "Sell Your Car",
    component: <SellCar />,
    path: "sell-your-car",
    showInMenu: true,
    hasAuthenticate: "all",
  },
  {
    label: "Login",
    component: <Login />,
    path: "login",
    showInMenu: false,
    hasAuthenticate: "no",
  },
  {
    label: "Register",
    component: <Register />,
    path: "register",
    showInMenu: false,
    hasAuthenticate: "no",
  },
  {
    label: "Forgot Password",
    component: <ForgotPassword />,
    path: "forgot-password",
    showInMenu: false,
    hasAuthenticate: "no",
  },
  {
    label: "Change Password",
    component: <ChangePassword />,
    path: "reset-password/:token",
    showInMenu: false,
    hasAuthenticate: "no",
  },
];
