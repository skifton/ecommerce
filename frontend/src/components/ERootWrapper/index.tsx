import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import EFooter from "../EFooter";
import EMainNavigation from "../ENavigation";

const ERootWrapper: React.FC = () => {
  return (
    <Fragment>
      <EMainNavigation />
      <Outlet />
      <EFooter />
    </Fragment>
  );
};

export default ERootWrapper;
