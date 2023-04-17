import { ArchiveBoxIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import React from "react";
import ESystemCard from "../../components/ESystemCard";
import { useGetUserList } from "../../services/auth.service";

const Dashboard: React.FC = () => {
    const { users: userList } = useGetUserList();
  return (
      <div className="grid grid-cols-1 items-start gap-4 mt-20 lg:grid-cols-3 lg:gap-8">
        <ESystemCard title="Amount of users" amount={userList?.length} description="All amount of registered users.">
            <UserGroupIcon className="w-10 h-10"/>
        </ESystemCard>
        <ESystemCard title="Amount of orders" amount={10} description="All amount of completed users.">
            <ArchiveBoxIcon className="w-10 h-10"/>
        </ESystemCard>
        <ESystemCard title="Amount of products" amount={10} description="All amount of existing products.">
            <ArchiveBoxIcon className="w-10 h-10"/>
        </ESystemCard>
      </div>
  );
};

export default Dashboard;
