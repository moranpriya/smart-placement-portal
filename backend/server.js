require("dotenv").config();
const path = require(
  "path"
);

const express = require(
  "express"
);

const cors = require(
  "cors"
);

const dotenv = require(
  "dotenv"
);

const connectDB = require(
  "./config/db"
);

const aiRoutes =
  require("./routes/aiRoutes"
);

const leaderboardRoutes =
  require(
    "./routes/leaderboardRoutes"
  );

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use(
  "/api/auth",
  require("./routes/authRoutes")
);

app.use(
  "/api/companies",
  require("./routes/companyRoutes")
);

app.use(
  "/api/applications",
  require("./routes/applicationRoutes")
);

app.use(
  "/uploads",
  express.static(
    path.join(
      __dirname,
      "uploads"
    )
  )
);

app.use(
  "/api/upload",
  require("./routes/uploadRoutes")
);

app.use(
  "/api/users",
  require("./routes/userRoutes")
);

app.use(
  "/api/experiences",
  require("./routes/experienceRoutes")
);

app.use(
  "/api/ai",
  aiRoutes
);

app.use(
  "/api/leaderboard",
  leaderboardRoutes
);

app.get("/", (req, res) => {
  res.send(
    "API Running"
  );
});

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});