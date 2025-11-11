const admin = require("firebase-admin");

if (process.env.NODE_ENV === "production") {
  // --------- PRODUCTION LOGIC (on AWS) ---------
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;

  // This is the key: replace the '\\n' from the env var with actual newlines
  const privateKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      "Missing Firebase environment variables (PROJECT_ID, CLIENT_EMAIL, or PRIVATE_KEY)"
    );
  }

  // Build the credential object manually
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: projectId,
      clientEmail: clientEmail,
      privateKey: privateKey,
    }),
    projectId: projectId,
  });

  console.log("Firebase initialized in PRODUCTION mode (from separate vars).");
} else {
  // --------- LOCAL DEVELOPMENT LOGIC (on your computer) ---------
  const serviceAccount = require("./serviceAccountKey.json");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: serviceAccount.project_id,
  });

  console.log("Firebase initialized in LOCAL mode.");
}

module.exports = admin;
