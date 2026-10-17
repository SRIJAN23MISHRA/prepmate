import axios from "axios";
import { useEffect, useState ,useContext} from "react";
import { AuthContext } from "../context/AuthContext";

function Notes(){
    const[note,setNote]=useState([]);
   
    const {accessToken}=useContext(AuthContext);
    useEffect(()=>{
       const getNotes=async()=>{
        try{
         const response=await axios.get("/api/notes",{headers:{Authorization:`Bearer ${accessToken}`}});
         setNote(response.data.findNote);

        }catch(err){
            console.log(err.response?.data);
            
        }
        
       }
       if(accessToken){
            getNotes();
        }
    },[accessToken])

return <>
<div>

{note.map((n)=>
    <div key={n._id}>
        <span>{n.title}</span>
        <span>{n.content}</span>
        </div>
)}
</div>
</>
}
export default Notes;