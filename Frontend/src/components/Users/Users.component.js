import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

// Components
import AddUser from "./AddUser.component";
import UpdateUser from "./UpdateUser.component";

// API
import { allUsers, deleteUser } from "api/users.api";

const Users = () => {
  const [users, setUsers] = useState([]);

  const fetchAllUsers = async () => {
    const res = await allUsers();

    if (!res.success) return toast.error(res.message);

    setUsers(res.data);
  };

  const handleDeletion = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this?");

    if (!confirmed) return;

    const res = await deleteUser(id);

    if (!res.success) return toast.error(res.message);

    toast.success(res.message);
    fetchAllUsers();
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div>
      <div className="mx-auto mt-4 w-full px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <p className="mt-2 text-sm text-gray-700">
              A list of all the users in the system including their name, email
              and role.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <AddUser fetchAllUsers={fetchAllUsers} />
          </div>
        </div>
      </div>
      <div className="mt-8 flow-root overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <table className="w-full text-left">
            <thead className="bg-white">
              <tr>
                <th
                  scope="col"
                  className="relative isolate py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                >
                  Name
                  <div className="absolute inset-y-0 right-full -z-10 w-screen border-b border-b-gray-200" />
                  <div className="absolute inset-y-0 left-0 -z-10 w-screen border-b border-b-gray-200" />
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Role
                </th>
                <th scope="col" className="relative py-3.5 pl-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.email}>
                  <td className="relative py-4 pr-3 text-sm font-medium text-gray-900">
                    {user.name}
                    <div className="absolute bottom-0 right-full h-px w-screen bg-gray-100" />
                    <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 md:table-cell">
                    {user.email}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {user.type}
                  </td>
                  <td className="relative py-4 pl-3 text-right text-sm font-medium">
                    <UpdateUser user={user} fetchAllUsers={fetchAllUsers} />
                    &nbsp; | &nbsp;
                    <a
                      href="/"
                      className="text-primary hover:text-gray-500 font-[200]"
                      onClick={(e) => {
                        e.preventDefault();
                        handleDeletion(user._id);
                      }}
                    >
                      Delete<span className="sr-only">, {user.name}</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
