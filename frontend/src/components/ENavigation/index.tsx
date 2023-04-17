import React, { Fragment, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import EDesktopNavigation from "./EDesktopNavigation";
import EMobileNavigation from "./EMobileNavigation";

const EMainNavigation: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const isAdmin = context?.user?.role === "Admin";

  const onOpenMobileMenuHandler = () => {
    setMobileMenuOpen(true);
  };

  const onCloseMobileMenuHandler = () => {
    setMobileMenuOpen(false);
  };

  const onDashboardClickHandler = () => {
    navigate("/admin");
  };

  const onLogoutClickHandler = () => {
    context?.logout();
    navigate("/login");
  };
  const onClickLogoHandler = () => {
    navigate("/home");
  };
  return (
    <Fragment>
      <EDesktopNavigation
        isAuth={Boolean(context?.user)}
        onDashboardClick={onDashboardClickHandler}
        isAdmin={isAdmin}
        onOpenMobileMenu={onOpenMobileMenuHandler}
        onLogoutClick={onLogoutClickHandler}
        onClickLogo={onClickLogoHandler}
      />
      <EMobileNavigation
        isAuth={Boolean(context?.user)}
        onClickLogout={onLogoutClickHandler}
        mobileMenuOpen={mobileMenuOpen}
        onCloseMobileMenu={onCloseMobileMenuHandler}
      />
    </Fragment>
  );
};

export default EMainNavigation;
