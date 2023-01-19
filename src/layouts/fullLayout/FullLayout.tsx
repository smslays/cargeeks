import * as React from "react";
import Sidebar from "./Sidebar";

interface IFullLayoutProps {}

const FullLayout: React.FunctionComponent<IFullLayoutProps> = (props) => {
  return (
    <>
      <Sidebar />
    </>
  );
};

export default FullLayout;
