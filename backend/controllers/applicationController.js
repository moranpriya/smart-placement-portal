const User = require(
  "../models/User"
);

const Company = require(
  "../models/Company"
);

const sendMail = require(
  "../utils/sendMail"
);

const Application = require(
  "../models/Application"
);

const applyToCompany =
  async (req, res) => {

    try {

      const {
        studentId,
        companyId,
      } = req.body;

      const existing =
        await Application.findOne({
          student:
            studentId,

          company:
            companyId,
        });

      if (existing) {

        return res
          .status(400)
          .json({
            message:
              "Already Applied",
          });
      }

      const student =
        await User.findById(
          studentId
        );

      const company =
        await Company.findById(
          companyId
        );

      if (!student) {

        return res
          .status(404)
          .json({
            message:
              "Student Not Found",
          });
      }

      if (!company) {

        return res
          .status(404)
          .json({
            message:
              "Company Not Found",
          });
      }

      if (
        student.cgpa <
        company.minCGPA
      ) {

        return res
          .status(400)
          .json({
            message:
              "Not Eligible : CGPA Criteria Failed",
          });
      }

      if (
        !company.allowedBranches.includes(
          student.branch
        )
      ) {

        return res
          .status(400)
          .json({
            message:
              "Not Eligible : Branch Criteria Failed",
          });
      }

      const application =
        await Application.create({

          student:
            studentId,

          company:
            companyId,
        });

      res.json(
        application
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          error.message,
      });
    }
  };

const getApplications =
  async (req, res) => {

    try {

      const applications =
        await Application.find({
          student:
            req.params.id,
        }).populate(
          "company"
        );

      res.json(
        applications
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });
    }
  };

const getAllApplications =
  async (req, res) => {

    try {

      const applications =
        await Application.find()

          .populate(
            "student"
          )

          .populate(
            "company"
          );

      res.json(
        applications
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          error.message,
      });
    }
  };

const updateStatus =
  async (req, res) => {

    try {

      const application =
        await Application.findByIdAndUpdate(

          req.params.id,

          {
            status:
              req.body.status,
          },

          {
            new: true,
          }
        );

      const populated =
        await application.populate(
          "student company"
        );

      await sendMail(

        populated.student.email,

        `Application ${req.body.status}`,

        `Hello ${populated.student.name},

Your application for ${populated.company.companyName} has been ${req.body.status}.

Role: ${populated.company.role}

Best wishes for your placement journey.`
      );

      res.json(
        application
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          error.message,
      });
    }
  };

const getStats =
  async (req, res) => {

    try {

      const total =
        await Application.countDocuments();

      const approved =
        await Application.countDocuments({
          status:
            "Approved",
        });

      const rejected =
        await Application.countDocuments({
          status:
            "Rejected",
        });

      const pending =
        await Application.countDocuments({
          status:
            "Applied",
        });

      const percentage =
        total > 0
          ? (
            (approved / total) *
            100
          ).toFixed(2)
          : 0;

      res.json({
        total,
        approved,
        rejected,
        pending,
        percentage,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          error.message,
      });
    }
  };

module.exports = {
  applyToCompany,
  getApplications,
  getAllApplications,
  updateStatus,
  getStats,
};