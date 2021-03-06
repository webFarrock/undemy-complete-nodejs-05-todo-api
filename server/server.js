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


app.post('/todos', auth, (req, res) => {
    let todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});


app.get('/todos', auth, (req, res) => {
    Todo.find({
        _creator: req.user._id
    }).then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos/:id', auth, (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        res.status(400).send({error: 'id is not valid'});
    } else {
        Todo.findOne({
            _id: id,
            _creator: req.user._id
        }).then(todo => {
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


app.delete('/todos/:id', auth, (req, res) => {

    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        res.status(400).send({error: 'id is not valid'});
    } else {
        Todo.findOneAndRemove({
            _id: id,
            _creator: req.user._id,
        }).then(todo => {
            if (!todo) {
                res.status(404).send({error: 'Todo not found'});
            } else {
                res.status(200).send({todo});
            }
        }).catch(error => res.status(400).send({error}))
    }

});


app.patch('/todos/:id', auth, (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send({error: 'id is not valid'})
    }


    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findOneAndUpdate({
        _id: id,
        _creator: req.user._id
    }, {$set: body}, {new: true}).then((todo) => {
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

app.post('/users/login', (req, res) => {

    let body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then(user => {
        return user.generateAuthToken().then(token => {
            res.header('x-auth', token).send(user);
        });
    }).catch(err => {
        res.status(400).send();
    });

});

app.delete('/users/me/token', auth, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    });
});


app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};