const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  deadline: { type: Date, required: true },
  assignedTo: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['Pending', 'In Progress', 'Done'], 
    default: 'Pending' 
  }
});

module.exports = mongoose.model('Task', taskSchema);
