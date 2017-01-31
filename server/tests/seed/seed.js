const {ObjectID} = require('mongodb');
const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');
const jwt = require('jsonwebtoken');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [
    {
        _id: userOneId,
        email: 'someemail@mail.ru',
        password: 'userOnePass',
        tokens: [{
            access: 'auth',
            token: jwt.sign({_id: userOneId.toHexString(), access: 'auth'}, 'somesecret').toString(),
        }],
    },{
        _id: userTwoId,
        email: 'someemailTWO@mail.ru',
        password: 'userTWOPass',
        tokens: [{
            access: 'auth',
            token: jwt.sign({_id: userTwoId.toHexString(), access: 'auth'}, 'somesecret').toString(),
        }],
    }

];

const populateUsers = (done) => {
    User.remove({}).then(() => {
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();

        return Promise.all([userOne, userTwo]);

    }).then(() => done());
}


const todos = [
    {
        _id: new ObjectID(),
        text: 'Test todo 1',
        _creator: userOneId,
    }, {
        _id: new ObjectID(),
        text: 'Test todo 2',
        completed: true,
        completedAt: null,
        _creator: userTwoId,
    },
];

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
}


module.exports = {todos, populateTodos, users, populateUsers};