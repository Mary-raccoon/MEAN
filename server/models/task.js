// require mongoose
var mongoose = require('mongoose');
// create the schema
var TaskSchema = new mongoose.Schema({
  title: String,
  description: {type: String, default:''},
  // completed: {type: Boolean, default: false}
},
  {timestamps: true});
// register the schema as a model
var Task = mongoose.model('Task', TaskSchema);