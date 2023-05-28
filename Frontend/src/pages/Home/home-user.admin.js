import React from "react";
import * as Tabs from "@radix-ui/react-tabs";

// Shared
import Layout from "shared/layout.shared";

// Components
import AddToDo from "components/AddToDo/AddTodo.component";
import ToDoItem from "components/ToDoItem/ToDoItem.component";

const UserHome = () => {
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
            <AddToDo />
            <ToDoItem />
            <ToDoItem />
          </div>
        </Tabs.Content>
        <Tabs.Content className="TabsContent" value="tab2">
          <p className="Text">
            Change your password here. After saving, you'll be logged out.
          </p>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="currentPassword">
              Current password
            </label>
            <input className="Input" id="currentPassword" type="password" />
          </fieldset>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="newPassword">
              New password
            </label>
            <input className="Input" id="newPassword" type="password" />
          </fieldset>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="confirmPassword">
              Confirm password
            </label>
            <input className="Input" id="confirmPassword" type="password" />
          </fieldset>
          <div
            style={{
              display: "flex",
              marginTop: 20,
              justifyContent: "flex-end",
            }}
          >
            <button className="Button green">Change password</button>
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </Layout>
  );
};

export default UserHome;
