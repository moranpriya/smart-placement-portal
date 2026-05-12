const express =
  require("express");

const router =
  express.Router();

const OpenAI =
  require("openai");

const openai =
  new OpenAI({
    apiKey:
      process.env.OPENAI_API_KEY,
  });

router.post(
  "/generate-resume",
  async (req, res) => {

    try {

      const {
        name,
        branch,
        skills,
        projects,
      } = req.body;

      const prompt = `
Create a professional placement resume.

Name: ${name}
Branch: ${branch}
Skills: ${skills}
Projects: ${projects}

Generate:
- Summary
- Skills
- Projects
- Certifications
- Achievements
`;

      const completion =
        await openai.chat.completions.create({

          model:
            "gpt-3.5-turbo",

          messages: [
            {
              role:
                "user",

              content:
                prompt,
            },
          ],
        });

      res.json({

        result:
          completion.choices[0]
            .message.content,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "AI Resume Generation Failed",
      });
    }
  }
);

module.exports =
  router;