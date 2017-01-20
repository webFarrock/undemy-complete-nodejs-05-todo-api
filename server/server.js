const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/TodoApp');

let Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 2,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false,
    },
    completedAt: {
        type: Number,
        default: null
    },
});

let User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
})

let newUser = new User({
    name: 'John',
    email: 'test@mail.ru'
});

newUser.save().then((doc) => {
    console.log('User saved: ', doc);
}, (e) => {
    console.log('Unable to save user. ', e.message);
});

/*
let newTodo = new Todo({
    text: 'Todo something more again',
    text: ' 787878 !@    ',
   // completed: 'hello',

});

newTodo.save().then((doc) => {
    console.log('Saved todo', doc);
}, (e) => {
    console.log('Unable to save todo.', e.message);
})
    */