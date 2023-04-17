import React from "react";
import UsersTable from "./UsersTable";
import { useGetUserList } from "../../services/auth.service";
import ELoadingSpiner from "../../components/ELoadingSpinner";

const UsersControl: React.FC = () => {
    const { users: userList, isLoading } = useGetUserList();
  return (
    <div className="px-4 mt-10 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold text-white leading-6 text-gray-900">
            Users
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            A list of all the users in your account including their name, title,
            email and role.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 py-2 px-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add user
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 mt-6 ring-black ring-opacity-5 sm:rounded-lg">
              {isLoading ? <ELoadingSpiner /> : <UsersTable users={userList}/>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersControl;
