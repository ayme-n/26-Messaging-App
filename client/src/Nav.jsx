
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Navigate } from "react-router-dom";



function Nav(){

    const navigate = useNavigate();
    const token = localStorage.getItem("token")

    function handleLogout(){
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        localStorage.removeItem("UserID")

        navigate("/login")
       
    }

    if(!token|| token=="undefined"){

        return <Navigate to={"/login"}></Navigate>

    }

    return(
        <div className="Nav">

           <ul>
            
                <Link to={"/"}>Dashboard</Link> <br />

                <Link to={"/profile"}>Profile</Link> <br />

                <Link to={"/conversations"}>Conversations</Link> <br />

                <span onClick={handleLogout}>Logout</span>

           
           </ul>

        </div>
    )
}

export default Nav