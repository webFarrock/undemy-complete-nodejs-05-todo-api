const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }

    /*
    db.collection('Todos').deleteMany({test: "one"}).then((result)=>{
        console.log(result);
    });
    */

    /*
    db.collection('Todos').deleteOne({text: "one"}).then((result)=>{
        console.log(result);
    });
    */

    /*
    db.collection('Todos').findOneAndDelete({completed: false}).then((result)=>{
        console.log(result);
    });
    */

    db.collection('Users').findOneAndDelete({_id: new ObjectID('587fb81a0432291bd84cc4f7')}).then((result)=>{
        console.log(result);
    });

    db.close();
});