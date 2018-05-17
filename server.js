// // Require the Express Module
// var express = require('express');
// // Create an Express App
// var app = express();
// var mongoose = require('mongoose');
// // mongoose.connect('mongodb://localhost/tasks');
// mongoose.Promise = global.Promise;

// // Require body-parser (to receive post data from clients)
// var bodyParser = require('body-parser');
// // Integrate body-parser with our App
// // app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// // Require path
// var path = require('path');
// // Setting our Static Folder Directory
// app.use(express.static(path.join(__dirname, './public/dist/public')));
// require('./server/config/mongoose.js');
// // store the function in a variable
// var routes_setter = require('./server/config/routes.js');
// // invoke the function stored in routes_setter and pass it the "app" variablecopy

// app.listen(8000, function() {
//     console.log("listening on port 8000");
// });

// ========== CONFIG =============
let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let app = express();

app.use(express.static(path.join(__dirname, './public/dist/public')));
app.use(bodyParser.urlencoded({extended: true}));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
// ===============================

// ==== NEW MONGOOSE CODE! =======
let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/taskDB');
mongoose.Promise = global.Promise;


let TaskSchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String, default: "" },
    completed: { type: Boolean, default: false }
}, {timestamps: true})


let Task = mongoose.model("Task", TaskSchema);
// ==============================

// ===== ROUTES! ======
// Retrieve all Tasks
app.get('/tasks', function(req, res){
    Task.find({}, function(err, results){
        if(err){            
            res.json({message: "Error", error: err})
        }else{            
            res.json({message: "Success", data: results})
        }
    })
})

// Retrieve a Task by ID
app.get('/tasks/:id', function(req, res){
    Task.find({_id: req.params.id}, function(err, results){
        if(err){
            res.json({message: "Error", error: err});
        }else{
            res.json({message: "Success", data: results})
        }
    })
})

// Create a Task
app.post('/tasks', function(req, res){
    let new_task = new Task(req.body);
    new_task.save(function(err, results){
        if(err){
            res.json({message: "Error", error: err});
        }else{
            // res.redirect('/');
            res.json({message: "Success", data: results})
        }
    })
})

// Update a Task by ID
app.put('/tasks/:id', function(req, res) {
	Task.update({_id: req.params.id}, {$set: {title: req.body.title, description: req.body.description, completed: req.body.completed}}, {multi: false}, function(err, results) {
		if (err) {
			console.log('Update error', err);
			res.json({message:'Error',error:err});
		} else {
			res.json({message:'Success'});
		}
	})
})

// Delete a Task by ID
app.delete('/tasks/:id', function(req, res){
    Task.remove({_id: req.params.id}, function(err, results){
        if(err){
            res.json({message: "Error", error: err});
        }else{
            res.json({message:'Success delete'});
        }
    })
})


// ==== SERVER LISTENER! =======
app.listen(8000, function(){
    console.log("Express on port 8000!")
});
// =============================
