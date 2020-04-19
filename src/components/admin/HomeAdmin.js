import React from "react";
import { Route, Redirect, Link } from "react-router-dom";

const HomeAdmin = () => {



    return (
        <Route>
          {
            sessionStorage.getItem('admin') ? (
              <div>
              <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    
                
    
                <div className="collapse navbar-collapse ml-5" id="navbarSupportedContent">
                <div className="navbar-brand mr-auto">
                    Admin Dashboard
                </div>
    
                  <button className="btn btn-danger my-2 my-sm-0 m-5" >Button1</button>
        
                  <ul className="navbar-nav my-2 my-lg-0">
                    <li>
                      <button className="btn btn-outline-danger my-2 my-sm-0" >Ver Perfil</button>
                    </li>
    
                    <li>
                    <Link to= {'/'} className="btn btn-outline-danger my-2 my-sm-0">Cerrar sesión</Link>
                    </li>
    
                  </ul>
                </div>
              </nav>
              
              

            
            <div className="container-form my-auto mx-auto">
                <h1 className="display-4 my-auto mx-auto text-center">Welcome!</h1>
                
            </div>
     
            {/* { (page.actualState === FORUM) ? <Forum/> : 
              (page.actualState === PROFILE) ? <Profile/> :
              (page.actualState === SEARCH) ? <Search/> : <NewMessage/>
            } */}
    
            </div>
            ) :  sessionStorage.getItem('user') ? (<Redirect to="/home" /> ) : (<Redirect to="/" /> ) 
          }
    
        </Route>   
    
      );
}


export default HomeAdmin;