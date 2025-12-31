import mongoose from "mongoose";
const pasteSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
    expiresAt: {
      type: Date,
      default: null,
    },
    maxViews: {
      type: Number,
      default: null,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

pasteSchema.index(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 }
);

export default mongoose.model("paste", pasteSchema)