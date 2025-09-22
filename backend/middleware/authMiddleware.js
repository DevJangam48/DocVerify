const admin = require("../config/firebaseAdmin");
const { getAdminById } = require("../models/adminModel");

const verifyFirebaseToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = { uid: decoded.uid, email: decoded.email };
    next();
  } catch (err) {
    console.error("❌ Token verification failed:", err.message);
    console.error("Full error:", err);
    return res
      .status(403)
      .json({ error: "Invalid token", details: err.message });
  }
};

const verifyAdmin = async (req, res, next) => {
  try {
    const adminProfile = await getAdminById(req.user.uid);
    if (!adminProfile) {
      return res.status(403).json({ error: "Admin profile not found" });
    }
    req.user.collegeId = adminProfile.collegeId;
    next();
  } catch (err) {
    return res.status(500).json({ error: "Failed to verify admin" });
  }
};
module.exports = { verifyFirebaseToken, verifyAdmin };
