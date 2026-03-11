const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/notes',(req,res)=>{
  res.status(200).send("you got 4 notes")
})

app.post('/api/notes',(req,res)=>{
  res.status(201).json({message: "Note created successfully",})
})
app.put('/api/notes/:id',(req,res)=>{
  const noteId = req.params.id;
  if(!noteId ) {
    return res.status(400).json({message: "Note ID is required"})
  }
  res.status(200).json({message: `Note updated successfully with id ${noteId}`,})
})

app.delete('/api/notes/:id',(req,res)=>{
  const noteId = req.params.id;
  if(!noteId ) {
    return res.status(400).json({message: "Note ID is required"})
  }
  res.status(200).json({message: `Note deleted successfully with id ${noteId}`,})
})

app.listen(3000, () =>{
    console.log('Server is running on port 3000');
})