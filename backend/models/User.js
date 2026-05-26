const mongoose = require(
  "mongoose"
);

const userSchema =
  new mongoose.Schema({
    name: {
      type: String,
      default: "",
    },

    branch: {
      type: String,
      default: "",
    },

    cgpa: {
      type: Number,
      default: 0,
    },

    batch: {
      type: String,
      default: "",
    },

    skills: {
      type: [String],
      default: "",
    },

    github: {
      type: String,
      default: "",
    },

    linkedin: {
      type: String,
      default: "",
    },

    portfolio: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },

    resume: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,

      enum: [
        "student",
        "admin",
        "recruiter",
      ],

      default:
        "student",
    },
  });

module.exports =
  mongoose.model(
    "User",
    userSchema
  );