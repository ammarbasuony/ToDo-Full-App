// Model
import { Group, User } from "../models/index.js";

// Components
import deleteEntry from "../services/delete-entry.service.js";

// Errors Handler
import {
  serverError,
  handleEmptyValues,
  handleUniqueValues,
  recordExists,
  isValidId,
  areRecordsExists,
  areValidIds,
} from "../helpers/error-handler.helper.js";

// Constants
import { UserType } from "../helpers/constants.helper.js";

// ==========================================
//  CRUD
// ==========================================
export const index = async (req, res) => {
  const { page = 1, limit = 20, label } = req.query;
  const startIndex = (page - 1) * limit;

  try {
    let groups = await Group.find({
      ...(label && { label: { $regex: label, $options: "i" } }),
    })
      .skip(startIndex)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate("users");

    const totalGroups = await Group.countDocuments({
      ...(label && { label: { $regex: label, $options: "i" } }),
    });

    const totalPages = Math.ceil(totalGroups / limit);

    res.json({ success: true, totalPages: totalPages, data: groups });
  } catch (err) {
    serverError(res, err);
  }
};

export const GetGroupById = async (req, res) => {
  const { id } = req.params;

  try {
    const isIdValid = isValidId(id);
    if (isIdValid) return res.status(400).json(isIdValid);

    const isRecordExists = await recordExists(Group, id);
    if (isRecordExists) return res.status(404).json(isRecordExists);

    let group = await Group.findById(id).populate("users");

    res.json({ success: true, data: group });
  } catch (err) {
    serverError(res, err);
  }
};

export const CreateGroup = async (req, res) => {
  const errors = handleEmptyValues(req.body, Group);
  if (errors.length) {
    return res.status(400).json({ success: false, errors });
  }

  const uniques = await handleUniqueValues(req.body, Group);
  if (uniques.length) {
    return res.status(400).json({ success: false, errors: uniques });
  }

  // User Validation
  const areUserIdsNotValid = areValidIds(req.body.users);
  if (areUserIdsNotValid) return res.status(401).json(areUserIdsNotValid);

  const areUsersNotExist = await areRecordsExists(User, req.body.users);
  if (areUsersNotExist) return res.status(404).json(areUsersNotExist);

  // Admin Validation
  if (req.user.type !== UserType.ADMIN)
    return res.status(401).json({
      success: false,
      errors: ["Admins only allowed to perform this action"],
    });

  try {
    // Insert into DB
    const group = await Group.create(req.body);

    res.status(201).json({ success: true, data: group });
  } catch (err) {
    serverError(res, err);
  }
};

export const UpdateGroup = async (req, res) => {
  const { id } = req.params;

  const isIdValid = isValidId(id);
  if (isIdValid) return res.status(400).json(isIdValid);

  const errors = handleEmptyValues(req.body, Group, "update");
  if (errors.length) {
    return res.status(400).json({ success: false, errors });
  }

  const isRecordExists = await recordExists(Group, id);
  if (isRecordExists) return res.status(404).json(isRecordExists);

  const uniques = await handleUniqueValues(req.body, Group, id);
  if (uniques.length) {
    return res.status(400).json({ success: false, errors: uniques });
  }

  // User Validation
  if (req.body.users) {
    const areUserIdsNotValid = areValidIds(req.body.users);
    if (areUserIdsNotValid) return res.status(401).json(areUserIdsNotValid);

    const areUsersNotExist = await areRecordsExists(User, req.body.users);
    if (areUsersNotExist) return res.status(404).json(areUsersNotExist);
  }

  try {
    const group = await Group.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({ success: true, data: group });
  } catch (err) {
    serverError(res, err);
  }
};

export const DeleteGroup = async (req, res) => {
  const { id } = req.params;
  const queries = req.query;

  try {
    const response = await deleteEntry(id, queries, Group, "Group");
    res.status(response.statusCode).json(response.body);
  } catch (err) {
    serverError(res, err);
  }
};
