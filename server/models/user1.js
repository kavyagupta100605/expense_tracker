const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema(
  {
    offerTitle: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    percentage: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    creationDate: {
      type: Date,
      default: Date.now,
    },
    image: {
        type: String,
        default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Offer", offerSchema);