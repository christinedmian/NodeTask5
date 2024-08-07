
const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient;
const connectionURL = 'mongodb://127.0.0.1:27017'

const dbname = "TaskMongoDB"


mongoClient.connect(connectionURL, (error, connectionRes) => {
    if (error) {
        console.log("error has been occured: ", error)
    }
    console.log("connected to dbname")
    const db = connectionRes.db(dbname)

    //1

    db.collection('users').insertOne({
        name: "user1",
        age: 15
    }, (error, data) => {
        if (error) {
            console.log("Unable to insert data")
        }
        console.log('insertOne', data.insertedId)
    })

    db.collection('users').insertOne({
        name: "user2",
        age: 20
    }, (error, data) => {
        if (error) {
            console.log("Unable to insert data")
        }
        console.log('insertOne', data.insertedId)
    }
)

    //2

    db.collection('users').insertMany(
        [
            {
                name: "user3",
                age: 27
            },
            {
                name: "user4",
                age: 30
            },
            {
                name: "user5",
                age: 27
            },
            {
                name: "user6",
                age: 23
            },
            {
                name: "user7",
                age: 27
            },
            {
                name: "user8",
                age: 26
            },
            {
                name: "user9",
                age: 27
            },
            {
                name: "user10",
                age: 29
            },
            {
                name: "user11",
                age: 27
            },
            {
                name: "user12",
                age: 23
            }
        ], (error, data) => {
            if (error) {
                console.log("Unable to insert Many data")
            }
            console.log('istert 10 Users haas been done', data.insertedCount)
        }
    )

    //3 
    db.collection('users').find({age:27}).toArray((error,users)=>{
        if(error){
            return console.log("error has been occured in Find 27 age: ",error)
        }
        console.log('find the users who are 27 age :', users)
    })

    //4 
    db.collection('users').find({age:27}).limit(3).toArray()
    .then((limitUserData)=>console.log("first 3 users who are 27 age :" ,limitUserData))
    .catch((error)=>{
        console.log("error has been occured in Find 27 age: ",error)
    })
    //5
    db.collection('users').find({age:27}).limit(4).toArray()
    .then((data)=>{
        data.forEach(element => {
            db.collection('users').updateOne({name:element.name},{$set:{ name: element.name+ " Updated"},$inc:{age:4}})
        });
    })
    .catch((error)=>{
        console.log("error has been occured in mdified user1: ",error)
    })
    
    //6

    db.collection('users').updateMany({},{$inc:{age:10}})
    .then((updatedData)=>console.log("mdified all Users: ", updatedData.modifiedCount))
    .catch((error)=>{
        console.log("error has been occured in mdified all Users: ",error)
    })

    //7
    db.collection('users').updateMany({},{$inc:{age:10}})
    .then((updatedData)=>console.log("mdified all Users: ", updatedData.modifiedCount))
    .catch((error)=>{
        console.log("error has been occured in mdified all Users: ",error)
    })


    db.collection('users').deleteMany({ age:47})
    .then((data) => console.log("deleted all users who are 42 age", data.deletedCount))
        .catch((error) => {
            console.log("error has been occured in deleted all users who are 42 age: ",error)

        })
})


