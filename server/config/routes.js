var tasks = require('../controllers/tasks.js');
module.exports = function(app){
  app.get('/', function(req, res) {	
	 res.render('index.html');
  })
  app.get('/tasks', function(req, res) {
    tasks.show(req,res); 
  })
//   app.get('/tasks', tasks.show) 
  app.get('/tasks/:id', function(req, res) {
    tasks.findOne(req,res,req.params.id); 
  })
  app.post('/tasks', function(req, res) {
    tasks.create(req,res,req.params.title,req.params.description);
  })
  app.delete('/tasks/:id', function(req, res) {
    tasks.deleteOne(req,res,req.params.id); 
  })
  app.put('/tasks/:id', function(req, res) {
    tasks.updateOne(req,res,req.params.id, req.params.title, req.params.description); 
  })
};