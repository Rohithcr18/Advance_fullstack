const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [4, 'Age must be at least 4'],
    max: [25, 'Age must be at most 25']
  },
  class: {
    type: String,
    required: [true, 'Class is required'],
    trim: true
  },
  fathersName: {
    type: String,
    required: [true, "Father's name is required"],
    trim: true
  },
  mothersName: {
    type: String,
    required: [true, "Mother's name is required"],
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Student", studentSchema);