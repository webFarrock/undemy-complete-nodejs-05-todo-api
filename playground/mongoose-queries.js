const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');


var id = '58884c951d1b4b042e86b540';

if(!ObjectID.isValid(id)){
    return console.log('Object id is not valid');
}

Todo.find({
    _id: id,
}).then((todos)=>{
    if(!todo.length){
        return console.log('Todo by find() not found')
    }
    console.log('Todos find: ', todos);
}).catch(e => console.log('Todo by find() not found'));



Todo.findOne({
    _id: id
}).then((todo) => {
    if(!todo){
        return console.log('Todo by findOne() not found')
    }
    console.log('Todo find one:', todo);
}).catch(e => console.log('Todo by findOne() not found'));

Todo.findById(id)
    .then(todo => {
        if(!todo){
            return console.log('Todo by findById() not found')
        }

        console.log('Todo by id: ', todo)
    })
    .catch(e => console.log('Todo by findById() not found'));