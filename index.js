const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
 const cors = require('cors')
 const app = express()
 const port = process.env.PORT || 5000
 app.use(cors())
 app.use(express.json())


// booksManager
// xzssw05kU5in0og0



const uri = "mongodb+srv://booksManager:xzssw05kU5in0og0@cluster0.psezczp.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    
    // const bookCollection = client.db('bookManager').collection('books')
    const bookCollection = client.db('bookManager').collection('bookss')

    //testing appi
    app.get('/',(req,res) =>{
        res.send('books manager running')
    })


    app.post('/upload-book', async(req,res) =>{
        const data = req.body
        console.log(data)
        const result = await bookCollection.insertOne(data)
        res.send(result)
    })

    app.get('/all-books', async(req,res) =>{
        const data = req.body
        console.log(data)
        const books = bookCollection.find()
        const result = await books.toArray()
        res.send(result)
    })
    
    app.get('/book/:id', async(req, res)=>{
      const id= req.params.id
      
      const filter = {_id : new ObjectId(id)}
  
      const data = await bookCollection.findOne(filter)
  
      res.send(data)
  
  })

    app.patch('/book/:id', async(req, res)=>{
    const id= req.params.id
    const updatedBookData= req.body
    const filter = {_id : new ObjectId(id)}
    const updatedDoc={
        $set:{
            ...updatedBookData
        }
    }

    const result= await bookCollection.updateOne(filter, updatedDoc)
    res.send(result)
})

    app.delete('/book/:id',async(req,res) =>{
        
            const id= req.params.id
            console.log(id)
           const filter = {_id : new ObjectId(id)}
    
        const result= await bookCollection.deleteOne(filter)
        console.log(result)
        res.send(result)
        
    })



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.listen(port,() =>{
    console.log(`books manager running${port}`)

})