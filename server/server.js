/** @format */

import express from "express";
import morgan from "morgan";
import { apiRoutes } from "./routes/apiRoutes.js";
import cors from "cors";
import dotenv from "dotenv";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

dotenv.config();

const PORT = process.env.PORT || 5001;
const app = express();

app.use(morgan("dev"));
// var jsonParser = bodyParser.json()

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
<<<<<<< HEAD
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
=======
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
>>>>>>> 1a3f819 (re-commit)
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/../client/build/index.html"));
});

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

const __dirname = dirname(fileURLToPath(import.meta.url));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "../client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
