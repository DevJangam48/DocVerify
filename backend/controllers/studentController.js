const { createStudent, getStudentById } = require("../models/studentModel");

exports.registerStudent = async (req, res) => {
  try {
    const data = req.body;
    // Add validation here as needed

    await createStudent({
      ...data,
      userID: data.userID,
      createdAt: new Date().toISOString(),
    });

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
