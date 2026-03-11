const express = require('express');
const app = express();
const notesRoutes = require('./routes/notesRoutes');
const connectDB = require('./config/db')
require('dotenv').config()
connectDB()
app.use(express.json());


app.use('/api/notes',notesRoutes)


const PORT = process.env.PORT || 3000

app.listen(PORT, () =>{
  
    console.log('Server is running on port 3000');
})