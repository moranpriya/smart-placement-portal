const express =
  require("express");

const router =
  express.Router();

const Application =
  require(
    "../models/Application"
  );

router.get(
  "/",

  async (
    req,
    res
  ) => {

    try {

      const placedStudents =
        await Application.find({

          status:
            "Approved",
        })

          .populate(
            "student"
          )

          .populate(
            "company"
          );

      const leaderboard =
  placedStudents

    .map(
      (app) => ({

        _id:
          app._id,

        name:
          app.student?.name,

        branch:
          app.student?.branch,

        company:
          app.company?.companyName,

        package:
          Number(
            app.company?.package
          ) || 0,
      })
    )

    .sort(
      (a, b) =>
        b.package - a.package
    );

      res.json(
        leaderboard
      );

    } catch (error) {

      res.status(500).json({

        message:
          error.message,
      });
    }
  }
);

module.exports =
  router;