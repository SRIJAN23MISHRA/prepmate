import { useContext, useEffect } from "react"
import { useState } from "react";
import { AuthContext } from "../context/AuthContext"
import axios from "axios";

function Topics(){
    const {accessToken}=useContext(AuthContext);
    const [topics,setTopics]=useState([]);
    const [name,setTopicName]=useState("");
   const handleDelete=async(id)=>{
        try{
         await axios.delete(`/api/topics/${id}`, { headers: { Authorization: `Bearer ${accessToken}` } });
         setTopics(topics.filter((t)=>
            t._id!=id));
         }
        catch(err){
             console.log(err.response?.data);
             
        }
    };
       
    const handleTopic=async(e)=>{
        e.preventDefault();
      try{
      const response=await axios.post("/api/topics",{name},{headers:{Authorization:`Bearer ${accessToken}`}});
      setTopics([...topics,response.data.topic]);
      setTopicName("");
      }catch(err){
          console.log(err.response?.data);
          
      }
    }
    useEffect(()=>{
          console.log("effect ran, token is:", accessToken);
        const getTopics=async ()=>{
      try{
      const response=await axios.get('/api/topics',{headers:{Authorization:`Bearer ${accessToken}`}});
      setTopics(response.data.specificTopic);
      }catch(err){
        console.log(err.response?.data);
        
      }
    };
    if(accessToken){
    getTopics();
    }
    },[accessToken])
    return <>
    <div>
        <form onSubmit={handleTopic}>
            <input type="text" placeholder="Topic Name" value={name} onChange={(e)=>{
                setTopicName(e.target.value);
            }}/>
            <button type="submit">Add</button>
        </form>
     {topics.map((t)=>
     <div key={t._id}>
        <span>{t.name}</span>
     <button onClick={()=>handleDelete(t._id)}>Delete</button>
     </div>
     )}
     
    </div>
    </>
}
export default Topics;