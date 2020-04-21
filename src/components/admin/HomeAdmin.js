import React, { useState, useEffect } from "react";
import { Route, Redirect, Link } from "react-router-dom";
import UserResults from './UserResults';
import Profile from '../forum/Profile';


const HomeAdmin = () => {

  const HOME_ADMIN = "HomeAdmin";
  const USERS = "Users";
  const PROFILE ="Profile";
  const MESSAGE_1 = "Welcome!";
  const MESSAGE_2 = "Usuarios";
  const MESSAGE_3 = "Perfil";





  const [page, changePage] = useState(HOME_ADMIN);
  const [message, setMessage] = useState(MESSAGE_1);

  // useEffect(() => {
  //   console.log(page);
  // }, [page])
  
  const changeToUsers = () => {
    changePage({
      actualState: USERS
    })

    setMessage(MESSAGE_2)
    
  }

  const changeToProfile = () => {
    changePage({
      actualState: PROFILE
    })

    setMessage(MESSAGE_3)
  }

  const changeToHome = () => {
    changePage({
      actualState: HOME_ADMIN
    })
    setMessage(MESSAGE_1)
    
  }




    return (
        <Route>
          {
            sessionStorage.getItem('admin') ? (
              <div>
              
              <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    
                
    
                <div className="collapse navbar-collapse ml-5" id="navbarSupportedContent">
                <div className="navbar-brand mr-auto" onClick={page === HOME_ADMIN ? null : changeToHome}>
                    Admin Dashboard
                </div>
    
                  
        
                  <ul className="navbar-nav my-2 my-lg-0">

                    <li>
                        <button className="btn btn-outline-danger my-2 my-sm-0" onClick={page === USERS ? null : changeToUsers}>Usuarios</button>
                    </li>

                    <li>
                      <button className="btn btn-outline-danger my-2 my-sm-0" onClick={page === PROFILE ? null : changeToProfile}>Ver Perfil</button>
                    </li>
    
                    <li>
                    <Link to= {'/'} className="btn btn-outline-danger my-2 my-sm-0">Cerrar sesión</Link>
                    </li>
    
                  </ul>
                </div>
              </nav>
              
              

            
            <div className="container-form my-auto mx-auto">
                <h1 className="display-4 my-auto mx-auto text-center">{message}</h1>
                
            </div>
     
            { (page.actualState === PROFILE) ? <Profile/> : 
              (page.actualState === USERS) ? <UserResults/> :
              null
            }
    
            </div>
            ) :  sessionStorage.getItem('user') ? (<Redirect to="/home" /> ) : (<Redirect to="/" /> ) 
          }
    
        </Route>   
    
      );
}


export default HomeAdmin;