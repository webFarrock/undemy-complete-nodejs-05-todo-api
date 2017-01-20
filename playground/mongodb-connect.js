const {MongoClient, ObjectID} = require('mongodb');

let obj = new ObjectID();



MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }

    console.log('Connected to MongoDB Server');


    db.collection('Todos').insertOne({
        text: 'Something to do again',
        completed: false,
    }, (err, result) => {
        if(err){
            return console.log('Unable to insert todo', err);

        }

        console.log(JSON.stringify(result.ops, undefined, 2));
    });
    /*

    db.collection('Users').insertOne({
        name: 'Pavel',
        last_name: 'Scheglov',
    }, (err, result) => {
        if(err){
            return console.log('Unable to insert user', err);
        }

        console.log(result.ops[0]._id.getTimestamp());
    });
    */


    db.close();
});