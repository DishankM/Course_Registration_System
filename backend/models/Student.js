const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone:{
    type: String,
    required: true,
  },
  courseId:{
    type: String,
  },
  message: {
    type: String
  }
  
});

module.exports = mongoose.model('Student', StudentSchema);