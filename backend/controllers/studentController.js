const { createStudent, getStudentById } = require("../models/studentModel");

exports.registerStudent = async (req, res) => {
  try {
    // Get UID and email securely from the decoded token
    const userId = req.user.uid;
    const email = req.user.email; // Get other details from the form body

    const { name, prn, collegeName, collegeId } = req.body; // Construct the data payload securely

    const studentProfile = {
      userID: userId,
      email: email,
      name,
      prn,
      collegeName,
      collegeId,
      createdAt: new Date().toISOString(),
    };

    await createStudent(studentProfile);

    res.status(201).json({ message: "✅ Student registered successfully" });
  } catch (error) {
    console.error("❌ Error in registerStudent:", error);
    res.status(500).json({ error: "❌ Failed to register student" });
  }
};

exports.getStudent = async (req, res) => {
  try {
    const { userID } = req.params;
    const student = await getStudentById(userID);
    if (!student)
      return res.status(404).json({ error: "❌ Student not found" });
    res.json(student);
  } catch (error) {
    console.error("❌ Error in getStudent:", error);
    res.status(500).json({ error: "❌ Failed to get student" });
  }
};
