require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose.js');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const {auth} = require('./middleware/auth');

const port = process.env.PORT;

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
            if (!todo) {
                res.status(404).send({error: 'Todo not found'});
            } else {
                res.status(200).send({todo});
            }
        }).catch(error => res.status(400).send({error}))
    }

});


app.patch('/todos/:id', (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send({error: 'id is not valid'})
    }


    console.log('body: ', body);
    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        console.log('todo: ', todo);
        if (!todo) {
            return res.status(404).send({error: "error while patching"});
        }

        res.status(200).send({todo})

    }).catch(e => {
        res.status(400).send({error: "error while patching"});
    });

});


app.post('/users', (req, res) => {
    let user = new User({
        email: req.body.email,
        password: req.body.password,
    });

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });
});



app.get('/users/me', auth,(req, res) => {
    res.send(req.user);
});


app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};