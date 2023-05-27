// Constants Helper
import { UserType } from "./constants.helper.js";

// Function to check if the values are empty
// depending on the model using "required" key as a flag
// type = "new" for new records
// type = "update" for updating records
export const handleEmptyValues = (data, model, type = "new") => {
  const errors = [];
  const dataKeys = Object.keys(data);

  const schemaKeys = Object.keys(model.schema.obj);
  const schemaValues = Object.values(model.schema.obj);
  const requiredKeys = schemaKeys.filter((key, i) => {
    const isRequired = Object.keys(schemaValues[i]).includes("required");
    if (isRequired) return key;
  });

  if (type === "new") {
    requiredKeys.forEach((key) => {
      if (!dataKeys.includes(key)) return errors.push(`${key} is required`);
    });
  }

  requiredKeys.forEach((key) => {
    if (data[key] === "") return errors.push(`${key} can't be empty`);
  });

  return errors;
};

// Function to check if the values are unique
// depending on the model using "unique" key as a flag
// id = null for new records, id = record id for updating records
export const handleUniqueValues = async (data, model, id = null) => {
  const errors = [];

  const schemaKeys = Object.keys(model.schema.obj);
  const schemaValues = Object.values(model.schema.obj);
  const uniqueKeys = schemaKeys.filter((key, i) => {
    const isRequired = Object.keys(schemaValues[i]).includes("unique");
    if (isRequired) return key;
  });

  for (const key of uniqueKeys) {
    const items = await model.findOne({ [key]: data[key] }).lean();
    if (items?._id && items?._id.valueOf() !== id)
      errors.push(`${key} already exists`);
  }

  return errors;
};

// Function to handle if a record/records exists or not
export const recordExists = async (model, id) => {
  const modelName = model.modelName.toLowerCase();

  const record = await model.findById(id);
  if (!record) {
    return { success: false, errors: [`${modelName} not exist!`] };
  }
};

export const areRecordsExists = async (model, ids) => {
  const modelName = model.modelName.toLowerCase();

  const records = await model.find({ _id: { $in: ids } });
  if (records.length !== ids.length) {
    return {
      success: false,
      error: [`One or All The ${modelName}s' not exist!`],
    };
  }
};

// Function to handle the server error response
export const serverError = (res, err, message = "Server Error") => {
  console.log(err);
  return res.status(500).json({ success: false, data: message });
};

// Function to check if the email is valid or not using regex
export const isValidEmail = (email) => {
  return email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
};

// Function to check if the password is valid or not using regex
export const isValidPassword = (password) => {
  return password.match(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
  );
};

// Function to check if the value exists in the
// enum or not depending on the model
export const isValidEnum = (value, model) => {
  const schemaValues = Object.values(model.schema.obj);
  const enumValues = schemaValues.filter((item) => {
    if (Object.keys(item).includes("enum")) return item.enum;
  });

  return enumValues[0].enum.includes(value);
};

// Function to check if the id is valid or not
export const isValidId = (id) => {
  if (!id.match(/^[0-9a-fA-F]{24}$/))
    return { success: false, errors: ["The Id Is Invalid"] };
};

export const areValidIds = (ids) => {
  const invalidIds = ids.filter((id) => !id.match(/^[0-9a-fA-F]{24}$/));
  if (invalidIds.length)
    return { success: false, errors: ["One or All The Ids Are Invalid"] };
};

export const isValidDate = (date) => {
  if (date.match(/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[012])-(19|20)\d\d$/))
    return { success: false, errors: ["The Date Is Invalid"] };
};

export const isAdmin = async (model, id) => {
  const record = await model.findById(id);
  if (record.type === UserType.ADMIN) {
    return {
      success: false,
      errors: ["Admins not allowed to perform this action"],
    };
  }
};