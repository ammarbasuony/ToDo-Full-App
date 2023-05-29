import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useSelector } from "react-redux";
import * as Form from "@radix-ui/react-form";
import { Cross2Icon } from "@radix-ui/react-icons";
import { toast } from "react-toastify";

// API
import { updateToDo } from "api/todos.api";

// Helpers
import icons from "helper/icons.helper";

const UpdateToDo = ({ fetchToDos, todo, setOpenActionsMenu }) => {
  const { user } = useSelector((state) => state.appReducer);

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: todo.title,
    content: todo.content,
  });

  const [loading, setLoading] = useState(false);

  const handleUpdateToDo = async (e) => {
    e.preventDefault();

    if (formData.title === "" || formData.content === "")
      return toast.error("Please fill all fields");

    setLoading(true);

    const res = await updateToDo(todo._id, formData);

    setLoading(false);
    if (!res.success) return res.errors.forEach((err) => toast.error(err));

    toast.success(res.message);

    fetchToDos();
    setIsOpen(false);
    setOpenActionsMenu(false);
  };

  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Trigger asChild>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-white p-3 rounded text-primary"
        >
          Edit
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed bg-[#00000067] top-0 left-0 w-full h-full"
          onClick={() => {
            setIsOpen(false);
            setFormData({
              title: "",
              content: "",
              user: user?._id,
            });
          }}
        />
        <Dialog.Content className="fixed bg-white top-9 left-1/2 -translate-x-1/2 p-6 rounded-xl w-full max-w-3xl">
          <Dialog.Title className="font-[300] text-xl">
            Update ToDo
          </Dialog.Title>
          <Dialog.Description className="text-gray-500 mt-2">
            change name and content of your todo
          </Dialog.Description>
          <Form.Root className="space-y-6 mt-5" onSubmit={handleUpdateToDo}>
            <Form.Field className="FormField" name="email">
              <Form.Label className="block text-sm font-[200] leading-6 text-gray-600">
                Title
              </Form.Label>
              <Form.Message
                className="text-[#ae5f5f] text-xs font-[100] mb-5"
                match="valueMissing"
              >
                Please enter todo title
              </Form.Message>
              <Form.Control asChild>
                <input
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-3"
                  type="text"
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  value={formData.title}
                  required
                  name="title"
                  id="title"
                />
              </Form.Control>
            </Form.Field>
            <Form.Field className="FormField" name="password">
              <Form.Label className="block text-sm font-[200] leading-6 text-gray-600">
                Content
              </Form.Label>
              <Form.Message
                className="text-[#ae5f5f] text-xs font-[100] mb-5"
                match="valueMissing"
              >
                Please enter todo content
              </Form.Message>
              <Form.Control asChild>
                <textarea
                  rows={5}
                  className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  required
                >
                  {formData.content}
                </textarea>
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
              onClick={() => {
                setIsOpen(false);
                setFormData({
                  title: "",
                  content: "",
                  user: user?._id,
                });
              }}
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default UpdateToDo;
