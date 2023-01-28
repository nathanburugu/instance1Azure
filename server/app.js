const express = require("express");
const path = require("path");
const connectToDatabase = require("./database/dbConfig");
const noteRoutes = require("./routes/index");
const errorMiddleware = require("./middlewares/error");
// we are adding helmet for security
const helmet = require("helmet");
// we dont need cors when we are using a vm but for local production we do need it
// const cors = require("cors");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(helmet());

// app.use(cors());

app.use(noteRoutes);

app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    errors: [
      {
        msg: "Route not found",
      },
    ],
  });
});

app.use(errorMiddleware);

const PORT = process.env.PORT || 3001;
connectToDatabase().then((_) => {
  app.listen(PORT, (_) => {
    console.log(`Server started on port ${PORT}`);
    console.log(app.get("env"));
  });
});
