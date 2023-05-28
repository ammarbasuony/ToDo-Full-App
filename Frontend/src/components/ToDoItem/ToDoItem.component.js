import React, { useState } from "react";

// Helpers
import icons from "helper/icons.helper";

const ToDoItem = () => {
  const [openActionsMenu, setOpenActionsMenu] = useState(false);

  return (
    <div className="aspect-square bg-[#4e6e8e] p-7 rounded-xl relative">
      <div
        className="text-white cursor-pointer absolute right-7"
        onClick={() => setOpenActionsMenu(!openActionsMenu)}
      >
        {openActionsMenu ? icons.closeIcon(13, 12) : icons.dotsIcon()}
      </div>
      {openActionsMenu ? (
        <div className="flex flex-col mt-10">
          <button className="bg-white p-3 rounded text-primary">Edit</button>
          <button className="bg-white p-3 rounded text-primary mt-3">Delete</button>
        </div>
      ) : (
        <>
          <div className="text-white text-3xl block font-[300] border-b-2 pb-2">
            ToDo Title
          </div>
          <div className="text-white text-sm flex mt-3 gap-1 items-center">
            {icons.userIcon()} Ammar Yaser
          </div>
          <div className="text-white text-sm flex mt-3 gap-1 items-center">
            {icons.clockIcon()} 2 days ago
          </div>

          <div className="text-[#ffffffcc] text-sm leading-[24px] mt-4 font-[100] h-[180px] overflow-auto custom-scrollbar">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum soluta
            culpa aspernatur illum error consequuntur iste nostrum, officia,
            sunt quas, libero atque accusantium voluptates repellendus quam
            iusto aut ipsam obcaecati. soluta culpa aspernatur illum error
            consequuntur iste nostrum, officia, sunt quas, libero atque
            accusantium voluptates repellendus quam iusto aut ipsam obcaecati.
            soluta culpa aspernatur illum error consequuntur iste nostrum,
            officia, sunt quas, libero atque accusantium voluptates repellendus
            quam iusto aut ipsam obcaecati.
          </div>
        </>
      )}
    </div>
  );
};

export default ToDoItem;
