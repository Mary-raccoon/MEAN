var mongoose = require('mongoose');
var Task = mongoose.model('Task');

module.exports = {
  show: function(req, res) {
    Task.find({}, function(err, tasks) {
        if(err){
            console.log(err);
            res.json(err)
        }
        else{
            console.log("Hello!")
        }
      console.log(tasks); 
      res.json(tasks);
    }) 
  },
  findOne: function(req,res,id) {
    Task.find({_id: id}, function(err, task){
      if(err){
          console.log(err);
              res.render('tasks', {errors: err})
          }
        console.log(task); 
        res.json(task);
    })
  },
  create: function(req, res, title, description) {
    var task = new Task({title: title, description: description});
    task.save(function(err) {
      if(err) {
        console.log('something went wrong');  
      }
      else{ 
        console.log('successfully added a task!');
      } 
      res.redirect('/tasks');
    })
  },
  deleteOne: function(req,res,id) {
    Task.deleteOne({_id: id}, function(err, task){
      if(err){
        console.log(err);
            res.render('tasks', {errors: err})
        }
      console.log("Deleted task"); 
      res.redirect('/tasks');
    })
  },
  updateOne: function(req,res,id,title,description) {
    Task.findByIdAndUpdate({_id: id}, { $set : {title: title, description: description} }, function(err, task){
      if(err){
          console.log(err);
              res.render('tasks', {errors: err})
          }
        console.log(task); 
        res.json(task);
    })
  },
}