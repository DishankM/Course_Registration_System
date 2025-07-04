const courses = require('../models/Courses');


//Get all Courses
exports.getCourses = (req, res) => {
 try {
    res.json({
            success: true,
            message: 'Data for all courses fetched successfully',
            data: courses,
    })
 } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Cannot fetch course data",
            error: error.message,  
        })
 }
};

//Get Courses By ID
exports.getCourseById = (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (course) {
    res.status(200).json({
            success: true,
            message: 'Course Details fetched successfully',
            data: course,
        })

  } else {
    res.status(404).json({
         success: false,
         message: 'Course not found'
        });
  }
};


//Student Registerations
exports.registerStudent = (req, res) => {
  const { name, email, phone, paymentMethod} = req.body;
  if (!name || !email || !phone || !paymentMethod) {
    return res.status(400).json({ message: "All Field is required" });
  }

  res.status(201).json({
    success: true,
    message: "Registration successful!",
    registrationId: Math.random().toString(36).substr(2, 9),
    registrationDate: new Date().toISOString()
  });
};
