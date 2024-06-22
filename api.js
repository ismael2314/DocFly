const express  =  require('express')
const mongodb  =  require('mongodb').MongoClient
const cors = require('cors')
//const bodyParse = require('body-parse')



app  = express()
app.use(cors())
app.use(express.urlencoded());
app.use(express.json());

// database
const conn = "mongodb+srv://myAtlasDBUser:23Luxgd%40rFEfJXG@myatlasclusteredu.99zx9rk.mongodb.net/DocFly?retryWrites=true&w=majority&appName=myAtlasClusterEDU"
const port = 7889
app.listen(port,(req,res)=>{
    database = mongodb.connect(conn)
    .then((data)=>{
        console.log("DataBase Connected - ",data.db().databaseName);
        return data.db();
    })
    console.log("Server Started!")
    console.log("got to : http://localhost:"+port)
})

// get document list
app.get('/api/document/list',(req,res)=>{
    console.log("Documets > ",req.query)
    const {user} =req.query
    database.then((e)=>{
        return e.collection('document').find({'recoredBy':user}).toArray()
    }).then((list)=>{
        console.log(list)
        res.json(list)
    }).catch((err)=>{
        res.send({Error:err})
    })
})
//----------------------------

// insert document information into data base
app.post('/api/document/insert',(req,res)=>{
    console.log("document insert > ",req.body)

    const {name,file,user,other}  = req.body.Document;
    Documents = {
        din:'DIN-'+new Date().getTime(),
        'name':name, // filter the input further
        'file':file, // filter the input further
        description:'',
        checkSum:'',
        'recorededOn':new Date(),
        'recoredBy':user ,// filter the input further
         other:other
    }
    console.log(name,file,user)
    res.json(req.body)
    database.then((e)=>{
        console.log(e.body)
        return e.collection('document').insertOne(Documents)
    })
    
})
// update document information 
app.post('/api/document/update',(req,res)=>{
    console.log("documet > ",req.body)
    const {id,name,file,user}  = req.body.Document;
    let doc ={
        'name' : name,
        'file':file,
    } 
    //console.log(doc,j)
    database.then((db)=>{
        
        return db.collection('document').findOneAndUpdate({din:id,recoredBy:user},{$set:doc},{returnNewDocument:true})
    }).then((result)=>{
        console.log("Document : ", req.body)
        res.json(result)
    })
    
})
// remove or change the document status to delete
// so the file or the recored could be considered deleted
app.post('/api/document/del',(req,res)=>{
    console.log("Delete Document > ",req.body)
    const {id,user}  = req.body.Document;
    database.then((db)=>{
        return db.collection('document').deleteOne({din: id,recoredBy:user}, ()=>{})
    }).then((result)=>{
        res.json(result)
    })
})
