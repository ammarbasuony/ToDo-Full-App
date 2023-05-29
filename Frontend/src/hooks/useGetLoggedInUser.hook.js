import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

// API
import { getUserByToken } from "api/auth.api";

// Properties
import properties from "properties.json";

// Actions
import { setUser } from "store/actions";

const useGetLoggedInUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});

  const token = Cookies.get(properties.AUTH_COOKIE_NAME);

  const getUser = async () => {
    const res = await getUserByToken();

    if (!res.success) {
      Cookies.remove(properties.AUTH_COOKIE_NAME);
      return navigate("/");
    }

    dispatch(setUser(res.data));
    setUserData(res.data);
  };

  useEffect(() => {
    if (!token) return navigate("/");
    getUser();
  }, []);

  return { userData };
};

export default useGetLoggedInUser;
