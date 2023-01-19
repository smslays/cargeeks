import React, {
  FunctionComponent,
  ReactComponentElement,
  useEffect,
} from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import BlankLayout from "./layouts/blankLayout/BlankLayout";
import FullLayout from "./layouts/fullLayout/FullLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  addLoggedUser,
  selectLoggedUser,
} from "./features/frontend/auth/AuthSlice";
import AuthService from "./services/AuthService";
import { Toast } from "./ui/toasts/Toast";


interface ProtectedRouteProps {
  children: ReactComponentElement<any>;
}

function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const loggedUser = useSelector(selectLoggedUser);
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("atoken");

  const destroySession = () => {
    sessionStorage.clear();
    dispatch(addLoggedUser({}));
    navigate("/login");
  };

  useEffect(() => {
    if (loggedUser?._id && !token) {
      destroySession();
    } else if (token) {
      AuthService.validateToken(token)
        .then((response) => {
          // if (response.status == 500) throw new Error("Session Expired");

          console.log("valid token");
        })
        .catch((err) => {
          console.error(err);
          destroySession();
        });
    }
  }, [pathname]);

  const ProtectedRoute: FunctionComponent<ProtectedRouteProps> = ({
    children,
  }) => {
    return loggedUser?._id && token ? children : <Navigate to="/login" />;
  };

  return (
    <>
      <Toast /> 
      <Routes>
        <Route path="/*" element={<BlankLayout />} />
        <Route
          path="secured/*"
          element={
            <ProtectedRoute>
              <FullLayout />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
