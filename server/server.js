const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose.js');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

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
app.listen(3000, () => {
    console.log('Started on port 3000');
});



module.exports = {app};