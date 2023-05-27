import mongoose from "mongoose";

const groupSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Group", groupSchema);
