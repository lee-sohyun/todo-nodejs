'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = process.env.PORT || 3000;


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const task = ['buy milk', 'learn javascript', 'learn express'];
const complete = ['finish learning nodejs'];

app.post('/addTask', (req, res) => {
  let newTask = req.body.newtask;
  task.push(newTask);
  res.redirect('/');
});

app.get('/', (req,res) => (
  res.render('index', { task, complete })
));

app.post('/complete', (req, res) => {
  let completeTask = req.body.check;
  if (typeof completeTask === 'string') {
    complete.push(completeTask);
    task.splice(task.indexOf(completeTask), 1);
  } else if (typeof completeTask === 'object') {
    for (let i = 0; i < completeTask.length; i++) {
      complete.push(completeTask[i]);
      task.splice(task.indexOf(completeTask[i]), 1)
    }
  }
  res.redirect('/');
});

app.post('/return', (req, res) => {
  let returnTask = req.body.check;
  if (typeof returnTask === 'string') {
    task.push(returnTask);
    complete.splice(complete.indexOf(returnTask), 1);
  } else if (typeof returnTask === 'object') {
    for (let i = 0; i < returnTask.length; i++) {
      task.push(returnTask[i]);
      complete.splice(complete.indexOf(returnTask[i]), 1)
    }
  }
  res.redirect('/');
});

app.listen(port, (err) => {
    if(err) {
        console.log(err)
    } else {
        console.log('running on port', port)
    }
});
