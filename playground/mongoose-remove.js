const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


// Todo.remove({}).then(result => console.log(result));

// Todo.findOneAndRemove;
// Todo.findByIdAndRemove

Todo.findByIdAndRemove('5889e4108a05529c364ebea2').then((todo) => {
    console.log('Todo.findByIdAndRemove done');
    console.log(todo);
})