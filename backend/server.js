const express = require("express");
const cors = require("./middleware/cors");
const app = express();
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const studentRoutes = require("./routes/studentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const documentRoutes = require("./routes/documentRoutes");

app.use(cors());
app.use(express.json());

// Test endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/students", studentRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/documents", documentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server started on port ${PORT}`);
});
