import jwt from "jsonwebtoken";

const createToken = (data) => {
  const maxAge = 30 * 24 * 60 * 60;
  return jwt.sign({ data }, process.env.JWT_USER_SECRET, {
    expiresIn: maxAge,
  });
};

export default createToken;
