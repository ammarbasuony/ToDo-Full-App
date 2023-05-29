import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Model
import { User } from "../models/index.js";

// Errors Handler
import {
  serverError,
  handleEmptyValues,
  handleUniqueValues,
  isValidEmail,
  isValidEnum,
  recordExists,
} from "../helpers/error-handler.helper.js";

// Helpers
import { UserType } from "../helpers/constants.helper.js";
import createToken from "../helpers/create-token.helper.js";

export const UserLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user)
      return res
        .status(404)
        .json({ success: false, errors: ["User is not exists!"] });

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword)
      return res
        .status(400)
        .json({ success: false, errors: ["Incorrect password!"] });

    const token = createToken(user);

    // Remove password from the response
    const userData = user.toObject();
    delete userData.password;

    res.json({ success: true, data: { user: userData, token } });
  } catch (err) {
    serverError(res, err);
  }
};

export const UserRegister = async (req, res) => {
  // Type is always "USER"
  req.body.type = UserType.USER;

  const errors = handleEmptyValues(req.body, User);
  if (errors.length) {
    return res.status(400).json({ success: false, errors });
  }

  const uniques = await handleUniqueValues(req.body, User);
  if (uniques.length) {
    return res.status(400).json({ success: false, errors: uniques });
  }

  if (!isValidEmail(req.body.email)) {
    return res.status(400).json({ success: false, errors: ["Invalid email"] });
  }

  // Hashing password
  const salt = await bcrypt.genSalt();
  req.body.password = await bcrypt.hash(req.body.password, salt);

  try {
    // Insert into DB
    const user = await User.create(req.body);

    // Remove "password" from response body
    const userData = user.toObject();
    delete userData.password;

    res.json({ success: true, data: userData });
  } catch (err) {
    serverError(res, err);
  }
};

export const GetUserFromToken = async (req, res) => {
  const token = req.token;

  try {
    const decoded = jwt.verify(token, process.env.JWT_USER_SECRET);

    const isRecordExists = await recordExists(User, decoded.data._id);
    if (isRecordExists) return res.status(404).json(isRecordExists);

    const user = await User.findById(decoded.data._id);

    // Remove password from the response
    const userData = user.toObject();
    delete userData.password;

    res.json({ success: true, data: userData });
  } catch (err) {
    serverError(res, err);
  }
};
