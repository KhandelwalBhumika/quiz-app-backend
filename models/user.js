const mongoose = require("mongoose");

const options = {
  versionKey: false,
  timestamps: {
    createdAt: true,
    updatedAt: "modifiedAt",
  },
};

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true
    },
    lastName: {
      type: String,
      trim: true,
      required: true
    },
    email: {
      type: String,
      lowercase:true,
      unique: true,
      required: [true, "Please provide your email"],
    },
    registrationId: {
      type: Number,
      unique: true,
      required: [true, "Please provide a unique 6 numeric digit registrtion Id"],
    },
    password: {
      type: String,
      trim: true,
      required: true
    }
  },
  options
);

module.exports = mongoose.model("User", userSchema);
