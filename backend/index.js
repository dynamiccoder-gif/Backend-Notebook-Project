import {connectToMongo} from './db.js'
import express from 'express'
const port=3000;
const app=express()
// Call the function asynchronously
connectToMongo()
    .then(() => {
        console.log('Connection established');
        // Proceed with other operations
    })
    .catch(error => {
        console.error(error);
    });
    
    app.get('/api/s',(req,res)=>
{
    res.send("hello boy")
})
app.listen(port,(req,res)=>
{
    console.log(`app is listeingi on port : ${port}`)
})