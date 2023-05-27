import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const auth = req.header("Authorization");
  const getToken = auth ? auth.split(" ") : [];
  const token = getToken.pop();

  if (!token) {
    return res.status(401).json({ success: false, errors: ["Unauthorized"] });
  }

  jwt.verify(token, process.env.JWT_USER_SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ success: false, errors: ["Unauthorized"] });
    }

    req.user = decodedToken.data;
    req.type = decodedToken.data.type;
    req.token = token;

    next();
  });
};

export default auth;
