const express = require("express");
const { apiRoutes } = require("./routes/apiRoutes.js");
const cors = require("cors");
// const dotenv = require("dotenv");
const path = require("path");
const { fileURLToPath } = require("url");

// dotenv.config();

const PORT = process.env.PORT || 8000;
// const PORT = 8000;
const app = express();

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

// const __dirname = dirname(fileURLToPath(import.meta.url));


const root = path.join(__dirname, "../client", "build");
app.use(express.static(root));
app.get("*", (req, res) => {
  res.sendFile("index.html", { root });
});


// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'))

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
