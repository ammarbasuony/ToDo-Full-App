import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Form from "@radix-ui/react-form";
import { Cross2Icon } from "@radix-ui/react-icons";
import { toast } from "react-toastify";

// API
import { updateUser } from "api/users.api";

// Helpers
import icons from "helper/icons.helper";
import { UserType } from "helper/constants.helper";

const UpdateUser = ({ fetchAllUsers, user }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    type: user.type,
  });
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    if (formData.name === "" || formData.email === "" || formData.type === "")
      return toast.error("Please fill all fields");

    if (formData.password === "") delete formData.password;

    setLoading(true);

    const res = await updateUser(user._id, {
      ...formData,
    });

    setLoading(false);
    if (!res.success) return res.errors.forEach((err) => toast.error(err));

    toast.success(res.message);

    fetchAllUsers();
    setIsOpen(false);
  };

  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Trigger asChild>
        <a
          href="/"
          className="text-primary hover:text-gray-500 font-[200]"
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(true);
          }}
        >
          Edit<span className="sr-only">, {user.name}</span>
        </a>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed bg-[#00000067] top-0 left-0 w-full h-full"
          onClick={() => setIsOpen(false)}
        />
        <Dialog.Content className="fixed bg-white top-9 left-1/2 -translate-x-1/2 p-6 rounded-xl w-full max-w-3xl">
          <Dialog.Title className="font-[300] text-xl">
            Add New User
          </Dialog.Title>
          <Dialog.Description className="text-gray-500 mt-2">
            Create a new user
          </Dialog.Description>
          <Form.Root className="space-y-6 mt-5" onSubmit={handleUpdateUser}>
            <Form.Field className="FormField" name="email">
              <Form.Label className="block text-sm font-[200] leading-6 text-gray-600">
                Name
              </Form.Label>
              <Form.Message
                className="text-[#ae5f5f] text-xs font-[100] mb-5"
                match="valueMissing"
              >
                Please enter user name
              </Form.Message>
              <Form.Control asChild>
                <input
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-3"
                  type="text"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  value={formData.name}
                  required
                />
              </Form.Control>
            </Form.Field>
            <Form.Field className="FormField" name="email">
              <Form.Label className="block text-sm font-[200] leading-6 text-gray-600">
                Email
              </Form.Label>
              <Form.Message
                className="text-[#ae5f5f] text-xs font-[100] mb-5"
                match="valueMissing"
              >
                Please enter user email
              </Form.Message>
              <Form.Message
                className="text-[#ae5f5f] text-xs font-[100] mb-5"
                match="typeMismatch"
              >
                Please provide a valid email
              </Form.Message>
              <Form.Control asChild>
                <input
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-3"
                  type="email"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  value={formData.email}
                  required
                />
              </Form.Control>
            </Form.Field>
            <Form.Field className="FormField" name="email">
              <Form.Label className="block text-sm font-[200] leading-6 text-gray-600">
                Password
              </Form.Label>
              <Form.Control asChild>
                <input
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-3"
                  type="password"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </Form.Control>
            </Form.Field>
            <Form.Field className="FormField" name="email">
              <Form.Label className="block text-sm font-[200] leading-6 text-gray-600">
                Role
              </Form.Label>
              <Form.Message
                className="text-[#ae5f5f] text-xs font-[100] mb-5"
                match="valueMissing"
              >
                Please select user role
              </Form.Message>
              <Form.Control asChild>
                <select
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-3"
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  required
                >
                  <option value="">Select Role</option>
                  <option
                    value="ADMIN"
                    selected={formData.type === UserType.ADMIN}
                  >
                    Admin
                  </option>
                  <option
                    value="USER"
                    selected={formData.type === UserType.USER}
                  >
                    User
                  </option>
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

export default UpdateUser;
