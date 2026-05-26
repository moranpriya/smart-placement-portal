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

console.log("Server initialized");

app.use(cors());

console.log("CORS enabled");

app.use(express.json());

console.log("JSON parsing enabled");

app.use(
  "/api/auth",
  require("./routes/authRoutes")
);

console.log("Auth routes set up");

app.use(
  "/api/companies",
  require("./routes/companyRoutes")
);
console.log("Company routes set up");

app.use(
  "/api/applications",
  require("./routes/applicationRoutes")
);
console.log("Application routes set up");

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
console.log("Upload routes set up");

app.use(
  "/api/users",
  require("./routes/userRoutes")
);
console.log("User routes set up");

app.use(
  "/api/experiences",
  require("./routes/experienceRoutes")
);
console.log("Experience routes set up");

app.use(
  "/api/ai",
  aiRoutes
);
console.log("AI routes set up");

app.use(
  "/api/leaderboard",
  leaderboardRoutes
);

app.get("/", (req, res) => {
  res.send(
    "API Running"
  );
});

app.use(
  "/uploads",
  express.static("uploads")
);

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});