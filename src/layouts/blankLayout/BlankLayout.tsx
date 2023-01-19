import React, { Suspense } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Header from "./Header";
import routes from "../../shared/routes/FrontendRoutes";
import { Routes, Route } from "react-router-dom";
import PageNotFound from "../../ui/PageNotFound/PageNotFound";
interface IBlankLayoutProps {}

const BlankLayout: React.FunctionComponent<IBlankLayoutProps> = (props) => {
  return (
    <>
      <Header />
      {/* routing of frontend routes without login */}
      <Suspense fallback={<CircularProgress />}>
        <Routes>
          {Array.isArray(routes) &&
            routes.map(({ path, component }, i) => (
              <Route key={path + i} path={path} element={component} />
            ))}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default BlankLayout;

// http://localhost:3000/
// http://localhost:3000/secured
// http://localhost:3000/pagenotfound
