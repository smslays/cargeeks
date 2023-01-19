import * as React from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "../../ui/loader/Loader";
import routes from "../../shared/routes/AdminRoutes";
import { useSelector } from "react-redux";
import { selectLoggedUser } from "../../features/frontend/auth/AuthSlice";
import PageNotFound from "../../ui/PageNotFound/PageNotFound";
interface ISideBarRouteProps {}

const SideBarRoute: React.FunctionComponent<ISideBarRouteProps> = (props) => {
  const loggedUser = useSelector(selectLoggedUser);
  return (
    <React.Suspense fallback={<Loader />}>
      <Routes>
        {Array.isArray(routes) &&
          routes
            .filter((route) => route?.roles?.includes(loggedUser?.role))
            .map((route, i) => {
              return (
                <Route
                  key={route.path + i}
                  path={route.path}
                  element={route.component}
                />
              );
            })}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </React.Suspense>
  );
};

export default SideBarRoute;
