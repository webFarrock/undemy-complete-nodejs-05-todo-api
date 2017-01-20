const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }

    /*
    db.collection('Todos').find({
        _id: new ObjectID("587fb302862e8626206ceca8")
    }).toArray().then((docs) => {
        console.log('Todos');
        console.log(JSON.stringify(docs, "", 2));
    }, (err) => {
        console.log('Unable to fetch todos', err);
    });
*/
/*
    db.collection('Todos').find().count().then((count) => {
        console.log('Todos count:', count);

    }, (err) => {
        console.log('Unable to fetch todos', err);
    });
    */
    
    db.collection('Users').find({
        name: "Pavel"
    }).toArray().then((docs) => {
        console.log('Users');
        console.log(JSON.stringify(docs, ["name", "age"], 2));
    }, (err) => {
        console.log('Unable to fetch users');
    })

    db.close();
});