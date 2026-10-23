import axios from "axios";
import { useEffect, useState ,useContext} from "react";
import { AuthContext } from "../context/AuthContext";

function Notes(){
    const[note,setNote]=useState([]);
    const[topics,setTopics]=useState([]);
    const[title,setTitle]=useState("");
    const[content,setContent]=useState("");
    const {accessToken}=useContext(AuthContext);
    const[topicId,setTopic]=useState("");

    useEffect(()=>{
       const getNotes=async()=>{
        try{
         const response=await axios.get("/api/notes",{headers:{Authorization:`Bearer ${accessToken}`}});
         const topicGet=await axios.get("/api/topics",{headers:{Authorization:`Bearer ${accessToken}`}});
         setTopics(topicGet.data.specificTopic);
         setNote(response.data.findNote);

        }catch(err){
            console.log(err.response?.data);
            
        }
        
       }
       if(accessToken){
            getNotes();
        }
    },[accessToken])
    const handleDelete=async(id)=>{
        try{
          await axios.delete(`/api/notes/${id}`,{headers:{Authorization:`Bearer ${accessToken}`}});
          setNote(note.filter((n)=>n._id!=id));
        }catch(err){
            console.log(err.response?.data);
            
        }
    }
const handleSubmit=async (e)=>{
    e.preventDefault();
    try{
        const response=await axios.post("/api/notes",{title:title,content:content,topic:topicId},{headers:{Authorization:`Bearer ${accessToken}`}});
          setNote([...note,response.data.newOne]);
          setTitle("");
          setContent("");
          setTopic("");
    }catch(err){
        console.log(err.response?.data);
        
    }
}
return <>
<div>
{note.map((n)=>
     <div key={n._id}>
        <p><strong>{n.title}</strong></p>
        <p>{n.content}</p>
     <button onClick={()=>handleDelete(n._id)}>Delete</button>
     </div>
     )}

<form  onSubmit={handleSubmit}>
<input type="text" value={title} placeholder="Title" onChange={(e)=>setTitle(e.target.value)} />
<input type="text" value={content} placeholder="Content" onChange={(e)=>setContent(e.target.value)}/>
<select required name="topic" value={topicId} onChange={(e)=>setTopic(e.target.value)} id="topic-select">
    <option value="">Choose a topic</option>
    {topics.map((t)=>
        <option key={t._id} value={t._id}>
            {t.name}
        </option>
    )}
   
</select>
 
 <button type="submit">Add note</button>
 </form>
 
</div>
</>
}
export default Notes;