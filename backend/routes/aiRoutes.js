const express =
  require("express");

const router =
  express.Router();

router.post(
  "/generate-resume",

  async (req, res) => {

    try {

      const {
        name,
        skills,
        projects,
        education,
        achievements,
      } = req.body;

      const generatedResume = `
${name}

PROFESSIONAL SUMMARY
Motivated and passionate student seeking placement opportunities with strong technical and problem-solving skills.

TECHNICAL SKILLS
${skills}

PROJECTS
${projects}

EDUCATION
${education}

ACHIEVEMENTS
${achievements}

CERTIFICATIONS
• Web Development
• Data Structures & Algorithms

STRENGTHS
• Teamwork
• Leadership
• Communication
• Quick Learner

`;

      res.json({

        result:
          generatedResume,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Resume Generation Failed",
      });
    }
  }
);

module.exports =
  router;