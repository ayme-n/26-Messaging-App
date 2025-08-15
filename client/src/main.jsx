import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signin from './Signin';
import Login from './Login';
import Profile from './Profile';
import "./styles/index.css"
import Dashboard from './Dashboard';
import Conversations from './Conversations';
import Conversation from './Conversation';
const router = createBrowserRouter([

  {
    path : "/signin",
    element : <Signin></Signin>
  },
  {
    path : "/login",
    element :  <Login></Login>
  },
  {
    path : "/profile",
    element : <Profile></Profile>
  },
  {
    path : "/",
    element : <Dashboard></Dashboard>
  },
  {
    path : "/conversations",
    element : <Conversations></Conversations>
  }
  ,
  {
    path : "/conversation/:ConversationID",
    element : <Conversation></Conversation>
  }
  
  
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router} /> 
  </StrictMode>,
)
