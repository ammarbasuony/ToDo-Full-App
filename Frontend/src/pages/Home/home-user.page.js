import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Tabs from "@radix-ui/react-tabs";
import { toast } from "react-toastify";

// API
import { allToDos } from "api/todos.api";

// Shared
import Layout from "shared/layout.shared";

// Components
import AddToDo from "components/ToDo/AddTodo.component";
import ToDoItem from "components/ToDo/ToDoItem.component";

// Helpers
import { UserType } from "helper/constants.helper";

const UserHome = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.appReducer);

  const [activeTodos, setActiveTodos] = useState([]);
  const [deletedTodos, setDeletedTodos] = useState([]);

  const fetchToDos = async (options) => {
    const res = await allToDos(options);

    if (!res.success) return toast.error(res.message);

    const active = res.data.filter((todo) => !todo.isDeleted);
    const deleted = res.data.filter((todo) => todo.isDeleted);

    setActiveTodos(active);
    setDeletedTodos(deleted);
  };

  useEffect(() => {
    if (user && user.type !== UserType.USER) {
      navigate("/admin");
    }

    if (user) {
      fetchToDos({
        user: user._id,
      });
    }
  }, [user]);

  return (
    <Layout customClasses="!flex justify-center items-center flex-col">
      <Tabs.Root
        className="bg-white shadow max-w-[1200px] w-full rounded-2xl m-7"
        defaultValue="tab1"
      >
        <Tabs.List className="TabsList" aria-label="Manage your account">
          <Tabs.Trigger
            className="w-1/2 border-b-2 py-4 px-1 text-center text-sm font-[200] border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 data-[state=active]:border-primary data-[state=active]text-primary"
            value="tab1"
          >
            ToDos
          </Tabs.Trigger>
          <Tabs.Trigger
            className="w-1/2 border-b-2 py-4 px-1 text-center text-sm font-[200] border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 data-[state=active]:border-primary data-[state=active]text-primary"
            value="tab2"
          >
            Pending Deletion
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content className="TabsContent" value="tab1">
          <div className="p-7 grid grid-cols-3 gap-4">
            <AddToDo fetchToDos={fetchToDos} />
            {activeTodos.map((todo) => (
              <ToDoItem key={todo._id} todo={todo} fetchToDos={fetchToDos} />
            ))}
          </div>
        </Tabs.Content>
        <Tabs.Content className="TabsContent" value="tab2">
          <div className="p-7 grid grid-cols-3 gap-4">
            {deletedTodos.map((todo) => (
              <ToDoItem deleted key={todo._id} todo={todo} />
            ))}
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </Layout>
  );
};

export default UserHome;
