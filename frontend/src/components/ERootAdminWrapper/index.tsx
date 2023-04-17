import React from "react";
import { Outlet } from "react-router-dom";
import EAdminNavigation from "../EAdminNavigation";

const ERootAdminWrapper: React.FC = () => {
  return (
    <div className="min-h-full">
      <div className="bg-gray-800 pb-32">
        <EAdminNavigation />
      </div>

      <main className="-mt-32">
        <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default ERootAdminWrapper;
