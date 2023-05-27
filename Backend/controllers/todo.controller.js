// Model
import { ToDo, User } from "../models/index.js";

// Components
import deleteEntry from "../services/delete-entry.service.js";

// Errors Handler
import {
  serverError,
  handleEmptyValues,
  handleUniqueValues,
  recordExists,
  isAdmin,
  isValidId,
} from "../helpers/error-handler.helper.js";

// ==========================================
//  CRUD
// ==========================================
export const index = async (req, res) => {
  const { page = 1, limit = 20, title, content, todo } = req.query;
  const startIndex = (page - 1) * limit;

  try {
    let todos = await ToDo.find({
      ...(title && { title: { $regex: title, $options: "i" } }),
      ...(content && { content: { $regex: content, $options: "i" } }),
      ...(todo && { todo }),
    })
      .skip(startIndex)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalToDos = await ToDo.countDocuments({
      ...(title && { title: { $regex: title, $options: "i" } }),
      ...(content && { content: { $regex: content, $options: "i" } }),
      ...(todo && { todo }),
    });

    const totalPages = Math.ceil(totalToDos / limit);

    res.json({ success: true, totalPages: totalPages, data: todos });
  } catch (err) {
    serverError(res, err);
  }
};

export const GetToDoById = async (req, res) => {
  const { id } = req.params;

  try {
    const isIdValid = isValidId(id);
    if (isIdValid) return res.status(400).json(isIdValid);

    const isRecordExists = await recordExists(ToDo, id);
    if (isRecordExists) return res.status(404).json(isRecordExists);

    let todo = await ToDo.findById(id);

    res.json({ success: true, data: todo });
  } catch (err) {
    serverError(res, err);
  }
};

export const CreateToDo = async (req, res) => {
  const errors = handleEmptyValues(req.body, ToDo);
  if (errors.length) {
    return res.status(400).json({ success: false, errors });
  }

  const uniques = await handleUniqueValues(req.body, ToDo);
  if (uniques.length) {
    return res.status(400).json({ success: false, errors: uniques });
  }

  // User Validation
  const isUserIdNotValid = isValidId(req.body.user);
  if (isUserIdNotValid) return res.status(401).json(isUserIdNotValid);

  const isUserNotExist = await recordExists(User, req.body.user);
  if (isUserNotExist) return res.status(404).json(isUserNotExist);

  const isUserAdmin = await isAdmin(User, req.body.user);
  if (isUserAdmin) return res.status(401).json(isUserAdmin);

  try {
    // Insert into DB
    const todo = await ToDo.create(req.body);

    res.status(201).json({ success: true, data: todo });
  } catch (err) {
    serverError(res, err);
  }
};

export const UpdateToDo = async (req, res) => {
  const { id } = req.params;

  const isIdValid = isValidId(id);
  if (isIdValid) return res.status(400).json(isIdValid);

  const errors = handleEmptyValues(req.body, ToDo, "update");
  if (errors.length) {
    return res.status(400).json({ success: false, errors });
  }

  const isRecordExists = await recordExists(ToDo, id);
  if (isRecordExists) return res.status(404).json(isRecordExists);

  const uniques = await handleUniqueValues(req.body, ToDo, id);
  if (uniques.length) {
    return res.status(400).json({ success: false, errors: uniques });
  }

  // User Validation
  if (req.body.user) {
    const isUserIdNotValid = isValidId(req.body.user);
    if (isUserIdNotValid) return res.status(401).json(isUserIdNotValid);

    const isUserNotExist = await recordExists(User, req.body.supplier);
    if (isUserNotExist) return res.status(404).json(isUserNotExist);

    const isUserAdmin = await isAdmin(req.body.user);
    if (isUserAdmin) return res.status(401).json(isUserAdmin);
  }

  try {
    const todo = await ToDo.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({ success: true, data: todo });
  } catch (err) {
    serverError(res, err);
  }
};

export const DeleteToDo = async (req, res) => {
  const { id } = req.params;

  try {
    const isIdValid = isValidId(id);
    if (isIdValid) return res.status(400).json(isIdValid);

    const isRecordExists = await recordExists(ToDo, id);
    if (isRecordExists) return res.status(404).json(isRecordExists);

    await ToDo.findByIdAndUpdate(
      id,
      {
        isDeleted: true,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.json({
      success: true,
      message: "Delete request is sent to be approved",
    });
  } catch (err) {
    serverError(res, err);
  }
};

export const DeleteToDoPermanently = async (req, res) => {
  const { id } = req.params;
  const queries = req.query;

  try {
    const response = await deleteEntry(id, queries, ToDo, "ToDo");
    res.status(response.statusCode).json(response.body);
  } catch (err) {
    serverError(res, err);
  }
};

export const RestoreToDo = async (req, res) => {
  const { id } = req.params;

  try {
    const isIdValid = isValidId(id);
    if (isIdValid) return res.status(400).json(isIdValid);

    const isRecordExists = await recordExists(ToDo, id);
    if (isRecordExists) return res.status(404).json(isRecordExists);

    await ToDo.findByIdAndUpdate(
      id,
      {
        isDeleted: false,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.json({
      success: true,
      message: "Restore request is sent to be approved",
    });
  } catch (err) {
    serverError(res, err);
  }
};
