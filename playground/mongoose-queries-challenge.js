const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {User} = require('./../server/models/user');

const id = '588205220b5cc26c0a9b3035';

if(!ObjectID.isValid(id)) return console.log('Object id is not valid');

User.findById(id)
    .then((user) => {
        if(!user) return console.log('User not found');
        console.log('User: ', user);
    }).catch(e => console.log('Error while users searching: ', e));