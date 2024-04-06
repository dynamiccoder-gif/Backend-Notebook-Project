import {connectToMongo} from './db.js'
import authRoutes from './routes/auth.js';
import noteRoutes from './routes/note.js';


import express from 'express'
const port=3000;


const app=express();

// Call the function asynchronously
connectToMongo()
    .then(() => {
        console.log('Connection established');
        // Proceed with other operations
    })
    .catch(error => {
        console.error(error);
    });

app.use(express.json())
//available routes 
app.use('/api/auth', authRoutes);
app.use('/api/note', noteRoutes);



app.listen(port,(req,res)=>{
    console.log(`app is listeingi on port : ${port}`)
})