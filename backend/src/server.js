const express = require('express');
const app = express();
const notesRoutes = require('./routes/notesRoutes');
const connectDB = require('./config/db')
const rateLimiter = require('./middleware/rateLimiter')
require('dotenv').config()
const cors = require("cors")


//middleware
app.use(cors({
    origin:"http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
    credentials: true
}))
app.use(express.json());



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