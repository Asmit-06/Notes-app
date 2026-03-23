import { Navbar } from "../components/Navbar"
import { useEffect, useState } from "react"
import { RateLimitedUI } from "../components/RateLimitedUI"
import { NoteCard } from "../components/NoteCard"
import axios from "axios"
import toast from "react-hot-toast"
export function HomePage(){
  const [rateLimited,setRateLimited] = useState(false)
  const[loading,setLoading] = useState(true)
  const [notes,setNotes] = useState([]);
  
  useEffect(()=>{

    const fetchNotes = async()=>{
      try{
        const res = await axios.get("http://localhost:3000/api/notes")
        console.log(res.data.data)
        setNotes(res.data.data)
        setRateLimited(false)
      }catch(err){
        console.log("error fetching notes")
        console.log(err)
        if(err.response?.status === 429){
          setRateLimited(true)
        }else{
          toast.error("failed to load notes")
        }
      }finally{
        setLoading(false)
      }
    }
    fetchNotes();
    
  },[])

  return(
    <div className="min-h-screen">
        <Navbar/>
       {rateLimited && <RateLimitedUI/>}
       <div className="max-w-7xl mx-auto p-4 mt-6">
         {loading && <div className="text-center text-primary py-10">Loading data</div>}
         {notes.length>0 && !rateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map(note=>{
              console.log("rendering note",note)
              return <NoteCard key={note._id} note={note}/>
            })}
          </div>
         )}
       </div>
    </div>
  )
}