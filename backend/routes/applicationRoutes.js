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
  "/recruiter",
  getRecruiterApplications
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