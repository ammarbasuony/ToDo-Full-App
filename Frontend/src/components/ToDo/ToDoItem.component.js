import React, { useState } from "react";
import { toast } from "react-toastify";

// API
import { deleteToDo, deleteToDoPermenantly } from "api/todos.api";

// Helpers
import icons from "helper/icons.helper";
import { readableDate } from "helper/functions.helper";

// Components
import UpdateToDo from "./UpdateTodo.component";

const ToDoItem = ({ deleted, isRequested, todo, fetchToDos }) => {
  const [openActionsMenu, setOpenActionsMenu] = useState(false);

  const handleDeletion = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this?");

    if (!confirmed) return;

    const res = await deleteToDo(todo._id);

    if (!res.success) return toast.error(res.message);

    toast.success(res.message);
    fetchToDos();
  };

  const handlePermenantDeletion = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this permanently?"
    );

    if (!confirmed) return;

    const res = await deleteToDoPermenantly(todo._id);

    if (!res.success) return toast.error(res.message);

    toast.success(res.message);
    fetchToDos();
  };

  return (
    <div>
      <div
        className={`aspect-square bg-[#4e6e8e] p-7 rounded-xl relative ${
          deleted ? "opacity-70 pointer-events-none" : ""
        }`}
      >
        {!isRequested && (
          <div
            className="text-white cursor-pointer absolute right-7"
            onClick={() => setOpenActionsMenu(!openActionsMenu)}
          >
            {openActionsMenu ? icons.closeIcon(13, 12) : icons.dotsIcon()}
          </div>
        )}
        {openActionsMenu ? (
          <div className="flex flex-col mt-10">
            <UpdateToDo
              fetchToDos={fetchToDos}
              todo={todo}
              setOpenActionsMenu={setOpenActionsMenu}
            />
            <button
              className="bg-white p-3 rounded text-primary mt-3"
              onClick={handleDeletion}
            >
              Delete
            </button>
          </div>
        ) : (
          <>
            <div className="text-white text-3xl block font-[300] border-b-2 pb-2">
              {todo.title}
            </div>
            <div className="text-white text-sm flex mt-3 gap-1 items-center">
              {icons.userIcon()} {todo.user.name}
            </div>
            <div className="text-white text-sm flex mt-3 gap-1 items-center">
              {icons.clockIcon()} {readableDate(todo.updatedAt)}
            </div>

            <div className="text-[#ffffffcc] text-sm leading-[24px] mt-4 font-[100] h-[180px] overflow-auto custom-scrollbar">
              {todo.content}
            </div>
          </>
        )}
      </div>

      {isRequested && (
        <button
          className="bg-[#884848] p-3 rounded text-white w-full mt-2"
          onClick={handlePermenantDeletion}
        >
          Delete Permanently
        </button>
      )}
    </div>
  );
};

export default ToDoItem;
