
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Nav from "./Nav";





function Profile(){

  const [Bio,SetBio] = useState("")
  const [displayName,SetdisplayName] = useState("")
  const [image,Setimage] = useState(null)
  const [ViewMode,SetMode] = useState(true)
  const token =  localStorage.getItem("token")
  const username = localStorage.getItem("username")

    
  async function GetInfos(){

    

      const respone  = await fetch(`${process.env.VITE_API_URL}/profile`,{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({username})
    })

    const data = await respone.json()

    const {displayName,bio,image} = data.infos

    SetdisplayName(displayName)
    SetBio(bio)
    Setimage(image)
  }

  useEffect(()=>{

      GetInfos()

  },[])

  async function handleEdit(e){

    e.preventDefault()

     const formData = new FormData();
    formData.append("username", username);
    formData.append("displayName", displayName);
    formData.append("bio", Bio);
    formData.append("image", e.target.image.files[0]);

    const respone = await fetch(`${process.env.VITE_API_URL}/profile`,{
    method: 'put',
    body: formData,
  })

  const res = await respone.json()

  Setimage(res.user.image)
    


 SetMode(true)   

}



  if(!token||token=="undefined") return <Navigate to={"/login"}></Navigate>

    return(
        <div className="profile_container">

          <Nav></Nav>

          {ViewMode && 

          <div className="display_profile">
              
              
                <img src={image} alt="Profile picture" width="150" id="icon_profile"/>
                
                <div className="infos_profile">
                      <h1>{displayName}</h1>

                      <p>{Bio}</p>

                      <p>
                          <button type="button" onClick={() => SetMode(false)}>Edit</button>
                      </p>
                </div>
          </div>
           }

          {!ViewMode && (
  <form className="edit_profile" encType="multipart/form-data" onSubmit={handleEdit}>
    <h2 className="edit_title">Edit Profile</h2>

    <div className="form_grid">
      <div className="form_group">
        <label htmlFor="displayName">Display Name</label>
        <input
          type="text"
          name="displayName"
          id="displayName"
          value={displayName}
          onChange={(e) => SetdisplayName(e.target.value)}
        />
      </div>

      <div className="form_group">
        <label htmlFor="image">Profile Image</label>
        <input type="file" name="image" id="image" />
        <small className="form_hint">PNG/JPG up to ~2MB</small>
      </div>

      <div className="form_group form_group--full">
        <label htmlFor="Bio">Bio</label>
        <textarea
          name="Bio"
          id="Bio"
          rows="5"
          value={Bio}
          onChange={(e) => SetBio(e.target.value)}
        />
      </div>
    </div>

    <div className="form_actions">
      <button type="button" className="btn btn--ghost" onClick={() => SetMode(true)}>
        Cancel
      </button>
      <input type="submit" value="Save" id="edit-btn" />
    </div>
  </form>
)}


          </div>
    )
}

export default Profile