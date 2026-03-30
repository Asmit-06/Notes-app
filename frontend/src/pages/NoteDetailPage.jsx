import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import { LoaderIcon, TrashIcon, ArrowLeft } from "lucide-react";
import { Link } from "react-router";
export function NoteDetailPage() {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const note = await axios.get(`http://localhost:3000/api/notes/${id}`);
        setNote(note.data);
        toast.success("Note loaded successfully");
      } catch (err) {
        console.error("Error fetching note:", err);
        toast.error("Failed to load note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async() => {
    if(!window.confirm("Are you sure you want to delte this note?"))return;
    try {
      await axios.delete(`http://localhost:3000/api/notes/${id}`);
      toast.success("Note deleted successfully");
      navigate('/');
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note");
    }
  };

  const handleSave = async() => {
    if(!note.title || !note.content){
      toast.error("Title and content are required");
      return;
    }
    setSaving(true);
    try {
       await axios.put(`http://localhost:3000/api/notes/${id}`, note);
        toast.success("Note saved successfully");
        navigate('/');
       
    } catch (error) {
      console.error("Error saving note:", error);
      toast.error("Failed to save note");
    }finally{
      setSaving(false);
    }
  }
  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="max-w-2xl mx-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeft className="size-5" />
              Back to Notes
            </Link>
            <button
              onClick={handleDelete}
              className="btn btn-error btn-outline"
            >
              <TrashIcon className="size-5" />
              Delete Note
            </button>
          </div>
          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input type="text" placeholder="Note title" className="input input-bordered"
                 value={note.title}
                 onChange={(e)=> setNote({...note,title:e.target.value})} />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea placeholder="Write your text here..." className="textarea textarea-bordered h-32" value={note.content} onChange={(e)=> setNote({...note,content:e.target.value})}></textarea>
              </div>
              <div className="card-actions justify-end">
                <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>

              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
