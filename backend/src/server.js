const express = require('express');
const app = express();
const notesRoutes = require('./routes/notesRoutes');
const connectDB = require('./config/db')
const rateLimiter = require('./middleware/rateLimiter')
require('dotenv').config()


//middleware
app.use(express.json());
app.use(rateLimiter)
//routes
app.use('/api/notes',notesRoutes)


const PORT = process.env.PORT || 3000
const start = async()=>{
    try{
        await connectDB()
        app.listen(PORT, () =>{
  
            console.log('Server is running on port 3000');
        })

    }catch(err){
        console.error('Failed to connect to the database', err);
        process.exit(1)
    }
}
start()