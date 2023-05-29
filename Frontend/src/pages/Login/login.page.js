import React, { useState } from "react";
import * as Form from "@radix-ui/react-form";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// API
import { login } from "api/auth.api";

// Properties
import properties from "properties.json";

// Actions
import { setUser } from "store/actions";

// Shared
import Layout from "shared/layout.shared";

// Assets
import Logo from "assets/media/png/icon.png";

// Helper
import icons from "helper/icons.helper";
import { UserType } from "helper/constants.helper";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (formData.email === "" || formData.password === "")
      return toast.error("Please fill all the fields");

    setLoading(true);
    const res = await login(formData.email, formData.password);
    setLoading(false);

    if (!res.success) return res.errors.forEach((err) => toast.error(err));

    Cookies.set(properties.AUTH_COOKIE_NAME, res.data.token);

    dispatch(setUser(res.data.user));

    if (res.data.user.type === UserType.ADMIN) return navigate("/admin");
    else return navigate("/user");
  };

  return (
    <Layout>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img className="mx-auto h-24 w-auto" src={Logo} alt="To Do" />
          <h2 className="mt-6 text-center text-2xl font-[400] leading-9 tracking-tight text-gray-900">
            Sign in to your account at{" "}
            <span className="text-primary">ToDo App</span>
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <Form.Root className="space-y-6" onSubmit={handleLogin}>
              <Form.Field className="FormField" name="email">
                <Form.Label className="block text-sm font-[200] leading-6 text-gray-900">
                  Email
                </Form.Label>
                <Form.Message
                  className="text-[#ae5f5f] text-xs font-[100] mb-5"
                  match="valueMissing"
                >
                  Please enter your email
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
                    required
                  />
                </Form.Control>
              </Form.Field>
              <Form.Field className="FormField" name="password">
                <Form.Label className="block text-sm font-[200] leading-6 text-gray-900">
                  Password
                </Form.Label>
                <Form.Message
                  className="text-[#ae5f5f] text-xs font-[100] mb-5"
                  match="valueMissing"
                >
                  Please enter your password
                </Form.Message>
                <Form.Control asChild>
                  <input
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-3"
                    type="password"
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                  />
                </Form.Control>
              </Form.Field>
              <Form.Submit asChild>
                <button className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                  {loading ? icons.spinnerIcon() : "Sign in"}
                </button>
              </Form.Submit>
            </Form.Root>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
