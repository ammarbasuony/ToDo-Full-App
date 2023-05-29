import React from "react";

// Helper
import icons from "helper/icons.helper";

const GroupItem = ({ group }) => {
  return (
    <div className="aspect-square border-[2px] rounded-2xl p-4">
      <div className="text-primary border-primary border-[2px] border-dotted font-[200] text-center p-2 rounded-xl">
        {group.label}
      </div>

      <div className="mt-4 flex flex-col gap-2 h-[calc(100%-60px)] overflow-auto custom-scrollbar">
        {group.users.map((user) => (
          <div className="text-primary bg-[#23456723] border-dotted font-[200] p-2 rounded-xl flex gap-1">
            <span className="relative bottom-[-1px]">{icons.userIcon()}</span>
            {user.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupItem;
