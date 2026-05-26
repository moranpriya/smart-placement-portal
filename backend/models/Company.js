const mongoose =
  require("mongoose");

const companySchema =
  new mongoose.Schema({

    companyName: {
      type: String,

      required: true,
    },

    role: {
      type: String,

      required: true,
    },

    package: {
      type: Number,
      required: true,
    },

    minCGPA: {
      type: Number,

      required: true,
    },

    allowedBranches: [
      String,
    ],

    description: {
      type: String,
    },

    deadline: {
      type: Date,
    },

  });

module.exports =
  mongoose.model(
    "Company",
    companySchema
  );