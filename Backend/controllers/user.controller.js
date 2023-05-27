import bcrypt from "bcrypt";

// Model
import { User } from "../models/index.js";

// Components
import deleteEntry from "../services/delete-entry.service.js";

// Errors Handler
import {
  serverError,
  handleEmptyValues,
  handleUniqueValues,
  isValidEmail,
  isValidEnum,
  recordExists,
  isValidId,
} from "../helpers/error-handler.helper.js";

// ==========================================
//  CRUD
// ==========================================
export const index = async (req, res) => {
  const { type, page = 1, limit = 20, name, email } = req.query;
  const startIndex = (page - 1) * limit;

  if (type && !isValidEnum(type, User)) {
    return res.status(400).json({ success: false, errors: ["Invalid type"] });
  }

  try {
    let users = await User.find({
      ...(type && { type }),
      ...(name && { name: { $regex: name, $options: "i" } }),
      ...(email && { email: { $regex: email, $options: "i" } }),
    })
      .skip(startIndex)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalUsers = await User.countDocuments({
      ...(type && { type }),
      ...(name && { name: { $regex: name, $options: "i" } }),
      ...(email && { email: { $regex: email, $options: "i" } }),
    });

    const totalPages = Math.ceil(totalUsers / limit);

    // Delete Passwords From The Users
    const allUsers = [];
    for (let i = 0; i < users.length; i++) {
      const userData = users[i].toObject();
      delete userData.password;
      allUsers.push(userData);
    }

    res.json({ success: true, totalPages: totalPages, data: allUsers });
  } catch (err) {
    serverError(res, err);
  }
};

export const GetUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const isIdValid = isValidId(id);
    if (isIdValid) return res.status(400).json(isIdValid);

    const isRecordExists = await recordExists(User, id);
    if (isRecordExists) return res.status(404).json(isRecordExists);

    let user = await User.findById(id);

    // Remove "password" from response body
    const userData = user.toObject();
    delete userData.password;

    res.json({ success: true, data: userData });
  } catch (err) {
    serverError(res, err);
  }
};

export const CreateUser = async (req, res) => {
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

  if (!isValidEnum(req.body.type, User)) {
    return res.status(400).json({ success: false, errors: ["Invalid type"] });
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

    res.status(201).json({ success: true, data: userData });
  } catch (err) {
    serverError(res, err);
  }
};

export const UpdateUser = async (req, res) => {
  const { id } = req.params;

  const isIdValid = isValidId(id);
  if (isIdValid) return res.status(400).json(isIdValid);

  const errors = handleEmptyValues(req.body, User, "update");
  if (errors.length) {
    return res.status(400).json({ success: false, errors });
  }

  const isRecordExists = await recordExists(User, id);
  if (isRecordExists) return res.status(404).json(isRecordExists);

  const uniques = await handleUniqueValues(req.body, User, id);
  if (uniques.length) {
    return res.status(400).json({ success: false, errors: uniques });
  }

  if (req.body.type && !isValidEnum(req.body.type, User)) {
    return res.status(400).json({ success: false, errors: ["Invalid type"] });
  }

  if (req.body.password) {
    // Hashing password
    const salt = await bcrypt.genSalt();
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }

  try {
    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    // Remove "password" from response body
    const userData = user.toObject();
    delete userData.password;

    res.json({ success: true, data: userData });
  } catch (err) {
    serverError(res, err);
  }
};

export const DeleteUser = async (req, res) => {
  const { id } = req.params;
  const queries = req.query;

  try {
    const response = await deleteEntry(id, queries, User, "User");
    res.status(response.statusCode).json(response.body);
  } catch (err) {
    serverError(res, err);
  }
};
