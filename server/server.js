const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose.js');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const port = process.env.PORT || 3000

let app = express();

app.use(bodyParser.json());


app.post('/todos', (req, res) => {
    let todo = new Todo({
        text: req.body.text,
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

/*
 app.post('/users', (req, res) => {
 let user = new User({
 email: 'someemail@mail.ru',
 name: 'somename',
 });
 });
 */


app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos/:id', (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        res.status(400).send({error: 'id is not valid'});
    } else {
        Todo.findById(id).then(todo => {
            if (!todo) {
                res.status(404).send({error: 'Todo not found'});
            } else {
                res.status(200).send({todo});
            }
        }).catch(e => {
            res.status(400).send({error: e});
        });
    }
});


app.delete('/todos/:id', (req, res) => {

    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        res.status(400).send({error: 'id is not valid'});
    } else {
        Todo.findByIdAndRemove(id).then(todo => {
            if(!todo){
                res.status(404).send({error: 'Todo not found'});
            }else{
                res.status(200).send({todo});
            }
        }).catch(error => res.status(400).send({error}))
    }

});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});


module.exports = {app};