import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

// API
import { allGroups } from "api/groups.api";

// Components
import GroupItem from "components/Groups/GroupItem.component";
import AddGroup from "./AddGroup.component";

const Groups = () => {
  const [groups, setGroups] = useState([]);

  const fetchAllGroups = async () => {
    const res = await allGroups();

    if (!res.success) return toast.error(res.message);

    setGroups(res.data);
  };

  useEffect(() => {
    fetchAllGroups();
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
            <AddGroup fetchAllGroups={fetchAllGroups} />
          </div>
        </div>
      </div>
      <div className="p-7 grid grid-cols-3 gap-4">
        {groups.map((group) => (
          <GroupItem key={group._id} group={group} />
        ))}
      </div>
    </div>
  );
};

export default Groups;
