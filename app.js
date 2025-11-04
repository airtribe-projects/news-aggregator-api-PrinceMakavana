require('dotenv').config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const logger = require("./middleware/loggerMiddleware");
const usersRoute = require("./routes/usersRoute.js");
const newsRoute = require("./routes/newsRoute.js");
const mongoose = require("mongoose");

app.use(express.json());
app.use(logger);
app.use(express.urlencoded({ extended: true }));

// Mount routes before connecting to MongoDB
app.use("/users", usersRoute);
app.use("/news", newsRoute);
app.get("/", (req, res, next) => {
  res.send("Hello World!!!");
});

// Validaiton For Env varialbes
const requiredEnvVars = ['MONGODB_CONNECTION_STRING', 'JWT_SECRET', 'GNEWS_API_KEY'];
const missingEnvVars = requiredEnvVars.filter((varName) => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.error(`Error: Missing required environment variables: ${missingEnvVars.join(', ')}`);
  process.exit(1);
}
// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log("Server is running on Port " + port);
    });
  })
  .catch((err) => {
    console.log("Database Connection Error:", err);
    process.exit(1);
  });

module.exports = app;
