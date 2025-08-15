
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Nav from "./Nav";
const API_URL = import.meta.env.VITE_API_URL;


function Dashboard(){



    const [conv_number,Set_conv_number] = useState(0)
    const [messages_number,Set_messages_number] = useState(0)
    const [displayName,SetdisplayName] = useState("")
    const [image,Setimage] = useState(null)
    const [conversations,SetConversations] = useState([])

    const token =  localStorage.getItem("token")
    const username = localStorage.getItem("username")
    const UserID = localStorage.getItem("UserID")
    const navigate = useNavigate();


    async function Set_conv(){


        const respone = await fetch(`${API_URL}/conversations`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username,})
    })

    const data = await  respone.json()

    Set_conv_number(data.conversations.length)

    }

      async function Set_msgs(){


        const respone = await fetch(`${API_URL}/messages/all`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({UserID:parseInt(UserID,10),})
    })

    const data = await  respone.json()

    Set_messages_number(data.messages.length)

    }

        
  async function GetInfos(){

    

      const respone  = await fetch(`${API_URL}/profile`,{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({username})
    })

    const data = await respone.json()

    const {displayName,image} = data.infos

    SetdisplayName(displayName)
    Setimage(image)
  }

      async function GetConvs(){


        const respone = await fetch(`${API_URL}/conversations`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username,})
    })

    const data = await  respone.json()

    SetConversations(data.conversations.slice(0, 4))


    }
    useEffect(()=>{

        Set_conv()
        Set_msgs()
        GetInfos()
        GetConvs()

    },[])


    if(!token|| token=="undefined"){

        return <Navigate to={"/login"}></Navigate>

    }

    return(
        <div className="dashboard_container">

            <Nav></Nav>


            <div className="dashboard">
            

            <div className="Logo">
                
                
                    <img src={image} alt="Profile picture" width="150" id="icon"/>
                

                <h3>Hi ,  {displayName}</h3>
            </div>

            <div className="conversations">
                <h3>Conversations</h3>
                <p>{conv_number}</p>
            </div>

            <div className="messages">
                <h3>Messages</h3>
                <p>{messages_number}</p>
            </div>

            <div className="contacts">
                <h3>Top Contacts</h3>
                <ul>
                    {conversations.map((conv)=>{
                        return conv.USER_ONE.id == UserID ?  <img src={conv.USER_TWO.image} id="icon_conv" key={conv.id}></img> : <img src={conv.USER_ONE.image} key={conv.id} id="icon_conv"></img>
                    })}
                </ul>
            </div>

            </div>
        

        </div>
    )
}

export default Dashboard