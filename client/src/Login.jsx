
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Navigate } from "react-router-dom";



function Login(){

    const [username,Setusername] = useState("")
    const [password,Setpassword] = useState("")
    const navigate = useNavigate();
    const token =  localStorage.getItem("token")

    
    async function handleSubmit(e){

    e.preventDefault()

    const respone = await fetch("http://localhost:3000/login",{
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        username ,password
    })
  })

    const res = await respone.json()

    const token = res.token


    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    localStorage.setItem('UserID', res.id);


  navigate("/");
   
}

    if(token && token !=="undefined")  return <Navigate to={"/"}></Navigate>


    return(
        <div className="Login_container">

            <div className="Login">
                
                <h1 id="login-title">Login</h1>


                <div >
                    <form id="login-form"  onSubmit={handleSubmit}>


                    <label htmlFor="username"></label>
                    <input type="text" name="username" id="username" placeholder="Username"
                    onChange={(e)=>{
                        Setusername(e.target.value)
                    }} 
                    />

                    <br />

                    <label htmlFor="password"></label>
                    <input type="password" name="password" id="password"  placeholder="Password"
                    onChange={(e)=>{
                        Setpassword(e.target.value)
                    }} 
                    />

                    <br />

                    <input type="submit" value={"login"} id="btn-login" />

                    </form>
                </div>


                <div className="create-acc">
                    <p>Create an account ?  <Link  to="/signin"className="signin-link"> Signin </Link></p>
                </div>

            </div>

        </div>
    )
}

export default Login