const cors = require("cors");

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  process.env.CLIENT_URL, // The future URL of your deployed Amplify frontend
];

module.exports = (options = {}) => {
  const corsOptions = {
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: options.allowedMethods || ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: options.allowedHeaders || ["Content-Type", "Authorization"],
  };

  const corsMiddleware = cors(corsOptions);
  return corsMiddleware;
};
