import { useContext, useEffect } from "react"
import { useState } from "react";
import { AuthContext } from "../context/AuthContext"
import axios from "axios";

function Topics(){
    const {accessToken}=useContext(AuthContext);
    const [topics,setTopics]=useState([]);
    const [name,setTopicName]=useState("");
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
     <p key={t._id}>{t.name}</p>
     )}
     
    </div>
    </>
}
export default Topics;