const Note = require('../models/Note');

const createNote = async(req,res)=>{

  try{
    const newNote = await Note.create(req.body);
    res.status(201).json({message: "Note created successfully", data: newNote})
  }catch(error){
    res.status(500).json({message: "Error creating note", error: error.message})
  }
}

const getAllNotes = async (req,res)=>{
 try{
  const notes = await Note.find().sort({createdAt:-1});//sort by createdAt in descending order or shows the newest note first
  res.status(200).json({message: "Notes retrieved successfully", data: notes})
 }
  catch(error){
    res.status(500).json({message: "Error retrieving notes", error: error.message})
  }
}
const updateNote = async (req,res)=>{
   try{
    const updatedNote= await Note.findByIdAndUpdate(req.params.id,req.body,{new:true})
    if(!updatedNote){
      res.status(404).json({message: "Note not found"})
    }
    res.status(200).json({message: "Note updated successfully", data: updatedNote})
   }catch(error){
    res.status(500).json({message: "Error updating note", error: error.message})
   }
}
const deleteNote = async(req,res)=>{
  try{
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if(!deletedNote){
      res.status(404).json({message:"Note not found"})
    }
    res.status(200).json({message: "Note deleted successfully"})
  }catch(error){
    res.status(500).json({message: "Error deleting note", error: error.message})
  }
  
}

const getNoteById = async(req,res) =>{
  try{
    const id = req.params.id;
    const note = await Note.findById(id);
    if(!note){
      res.status(404).json({message: "Note not found"})
    }
    res.status(200).json({message: "Note retrieved successfully", data: note})
  }catch(error){
    res.status(500).json({message: "Error retrieving note", error: error.message})
  }
  
  
}

module.exports = {
  createNote,
  getAllNotes,
  updateNote,
  deleteNote,
  getNoteById
}