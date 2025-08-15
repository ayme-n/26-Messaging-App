
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Nav from "./Nav";


function Conversations(){



    const [conversations,SetConversations] = useState([])
    const token =  localStorage.getItem("token")
    const username = localStorage.getItem("username")
    const UserID = localStorage.getItem("UserID")


    async function GetConvs(){


        const respone = await fetch("http://localhost:3000/conversations",{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username,})
    })

    const data = await  respone.json()

    SetConversations(data.conversations)


    }

    useEffect(()=>{
        GetConvs()
    },[])


    if(!token) return <Navigate to={"/login"}></Navigate>

    
    return(
        
        <div className="conversation_container">

            <Nav></Nav>

            <ul className="convs">

                {conversations.map((conv)=>{

                const friend = conv.USER_TWO.id == UserID ? conv.USER_ONE : conv.USER_TWO


                return <li key={conv.id}  className="conv"> <img src={friend.image} alt="" id="icon_conv"/> <p>{friend.displayName}</p>
                
                <button><Link to={`/conversation/${conv.id}`}>Send</Link></button></li>   

                })}
            

            </ul>
            


        </div>
    )
}

export default Conversations