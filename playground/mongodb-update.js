const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }

    console.log('Connected');

    db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID("5881ebe19ba8bf2060ba1e59"),
    }, {
        $set: {completed: true}
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });



    db.close();
});