import { date } from "zod";

const { default: mongoose } = require("mongoose");

const newSletterShcema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const newSletterModel =
  mongoose.models.newSletter || mongoose.model("newSletter", newSletterShcema);

export default newSletterModel;
