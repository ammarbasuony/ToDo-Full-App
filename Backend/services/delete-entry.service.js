// Errors Handler
import {
  areRecordsExists,
  recordExists,
} from "../helpers/error-handler.helper.js";

const deleteEntry = async (id, queries, model, modelName) => {
  const { all, many } = queries;

  if (all === "true") {
    await model.deleteMany({});
    return {
      statusCode: 200,
      body: {
        success: true,
        message: `All ${modelName}s deleted successfully`,
      },
    };
  } else if (many === "true") {
    const ids = id.split(",");

    const recordsExists = await areRecordsExists(model, ids);
    if (recordsExists)
      return {
        statusCode: 404,
        body: recordsExists,
      };

    await model.deleteMany({ _id: { $in: ids } });
    return {
      statusCode: 200,
      body: {
        success: true,
        message: `Selected ${modelName}s deleted successfully`,
      },
    };
  } else {
    const isRecordExists = await recordExists(model, id);
    if (isRecordExists)
      return {
        statusCode: 404,
        body: isRecordExists,
      };

    await model.findByIdAndDelete(id);
    return {
      statusCode: 200,
      body: {
        success: true,
        message: `${modelName} deleted successfully`,
      },
    };
  }
};

export default deleteEntry;
