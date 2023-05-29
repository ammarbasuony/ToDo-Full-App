import React, { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Form from "@radix-ui/react-form";
import { Cross2Icon } from "@radix-ui/react-icons";
import { toast } from "react-toastify";

// API
import { addGroup } from "api/groups.api";
import { allUsers } from "api/users.api";

// Helpers
import icons from "helper/icons.helper";

const AddGroup = ({ fetchAllGroups }) => {
  const [formData, setFormData] = useState({
    label: "",
    users: [],
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const fetchAllUsers = async () => {
    const res = await allUsers();

    if (!res.success) return toast.error(res.message);

    setUsers(res.data);
  };

  const handleSelect = (e) => {
    let options = e.target.options;
    let values = [];

    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        values.push(options[i].value);
      }
    }

    setFormData({ ...formData, users: values });
  };

  const handleAddGroup = async (e) => {
    e.preventDefault();

    if (formData.label === "" || !formData.users.length)
      return toast.error("Please fill all fields");

    setLoading(true);

    const res = await addGroup(formData);

    setLoading(false);
    if (!res.success) return res.errors.forEach((err) => toast.error(err));

    toast.success(res.message);

    fetchAllGroups();
    setIsOpen(false);
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="block rounded-md bg-primary px-3 py-2 text-center text-sm font-[200] text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => setIsOpen(true)}
        >
          Add group
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed bg-[#00000067] top-0 left-0 w-full h-full"
          onClick={() => setIsOpen(false)}
        />
        <Dialog.Content className="fixed bg-white top-9 left-1/2 -translate-x-1/2 p-6 rounded-xl w-full max-w-3xl">
          <Dialog.Title className="font-[300] text-xl">
            Add New Group
          </Dialog.Title>
          <Dialog.Description className="text-gray-500 mt-2">
            Create a new group
          </Dialog.Description>
          <Form.Root className="space-y-6 mt-5" onSubmit={handleAddGroup}>
            <Form.Field className="FormField" name="email">
              <Form.Label className="block text-sm font-[200] leading-6 text-gray-600">
                Label
              </Form.Label>
              <Form.Message
                className="text-[#ae5f5f] text-xs font-[100] mb-5"
                match="valueMissing"
              >
                Please enter group label
              </Form.Message>
              <Form.Control asChild>
                <input
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-3"
                  type="text"
                  onChange={(e) =>
                    setFormData({ ...formData, label: e.target.value })
                  }
                  required
                />
              </Form.Control>
            </Form.Field>
            <Form.Field className="FormField" name="email">
              <Form.Label className="block text-sm font-[200] leading-6 text-gray-600">
                Users
              </Form.Label>
              <Form.Message
                className="text-[#ae5f5f] text-xs font-[100] mb-5"
                match="valueMissing"
              >
                Please select group users
              </Form.Message>
              <Form.Control asChild>
                <select
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-3"
                  onChange={(e) => handleSelect(e)}
                  multiple
                  required
                >
                  {users.map((user) => (
                    <option className="font-[100]" value={user._id}>
                      {user.name} --- {user.email}
                    </option>
                  ))}
                </select>
              </Form.Control>
            </Form.Field>
            <Form.Submit asChild>
              <button className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                {loading ? icons.spinnerIcon() : "Save changes"}
              </button>
            </Form.Submit>
          </Form.Root>
          <Dialog.Close asChild>
            <button
              className="absolute top-5 right-5"
              aria-label="Close"
              onClick={() => setIsOpen(false)}
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AddGroup;
