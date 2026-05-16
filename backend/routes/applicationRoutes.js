const express = require(
  "express"
);

const router =
  express.Router();

const {
  applyToCompany,

  getApplications,

  getAllApplications,

  updateStatus,

  getStats,

  getRecruiterApplications,
} = require(
  "../controllers/applicationController"
);

router.post(
  "/apply",
  applyToCompany
);

router.get(
  "/all",
  getAllApplications
);

router.get(
  "/stats/overview",
  getStats
);

router.get(
  "/recruiter/:id",
  getRecruiterApplications
);

router.get(
  "/recruiter/:id",

  async (req, res) => {

    try {

      const Company =
        require("../models/Company");

      const Application =
        require("../models/Application");

      const companies =
        await Company.find({

          recruiter:
            req.params.id,
        });

      const companyIds =
        companies.map(
          (company) =>
            company._id
        );

      const applications =
        await Application.find({

          company: {
            $in:
              companyIds,
          },
        })

          .populate("student")

          .populate("company");

      res.json(applications);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          error.message,
      });
    }
  }
);

router.get(
  "/:id",
  getApplications
);

router.put(
  "/:id",
  updateStatus
);

module.exports =
  router;