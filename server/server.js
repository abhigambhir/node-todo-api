var express = require('express');
var bodyParser =require('body-parser');
const {ObjectID}= require('mongodb');


var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');

var app=express();

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
  var todo= new Todo({
    text: req.body.text
  });

    todo.save().then((doc)=>{
    res.send(doc);
  },(e)=>{
    res.status(400).send(e);
  });
});

app.get('/todos',(req,res)=>{
  Todo.find().then((todos)=>{
      res.send({todos});
  },(err)=>{
      res.status(500).send(err);
  });
});

// GET /todos/1234

app.get('/todos/:id',(req,res)=>{
  var id=req.params.id;

  if(!ObjectID.isValid){
    return res.status(404).send();
  }

  Todo.findById(id).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo});
  },(err)=>{
    res.status(400).send();
  });

});


app.listen(3000,()=>{
  console.log('Server is set up at port 3000');
});

module.exports={app};
