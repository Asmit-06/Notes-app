const createNote = (req,res)=>{
  res.status(201).json({message: "Note created successfully",})
}

const getAllNotes = (req,res)=>{
  res.status(200).send("you got 4 notes")
}
const updateNote = (req,res)=>{
  const noteId = req.params.id;
  if(!noteId ) {
    return res.status(400).json({message: "Note ID is required"})
  }
  res.status(200).json({message: `Note updated successfully with id ${noteId}`,})
}
const deleteNote = (req,res)=>{
  const noteId = req.params.id;
  if(!noteId ) {
    return res.status(400).json({message: "Note ID is required"})
  }
  res.status(200).json({message: `Note deleted successfully with id ${noteId}`,})
}

module.exports = {
  createNote,
  getAllNotes,
  updateNote,
  deleteNote
}