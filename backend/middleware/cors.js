const cors = require("cors");

module.exports = (options = {}) => {
  const corsOptions = {
    origin: "http://localhost:5173",
    methods: options.allowedMethods || ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: options.allowedHeaders || ["Content-Type", "Authorization"],
  };

  const corsMiddleware = cors(corsOptions);

  return corsMiddleware;
};
