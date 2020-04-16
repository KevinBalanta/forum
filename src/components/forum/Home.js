import React from "react";
import Forum from "./Forum";
import { Route, Redirect, Link } from "react-router-dom";

//import { useAuth } from "./context/auth";



const Home = () => {


  return (
    <Route>
      {
        sessionStorage.getItem('email') ? (
          <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" >
              Forum
            </a>
    
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="form-inline mr-auto">
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
                  Search
                </button>
              </form>
    
              <ul className="navbar-nav my-2 my-lg-0">
                <li>
                  <button className="btn btn-outline-success my-2 my-sm-0" >Ver Perfil</button>
                </li>

                <li>
                <Link to= {'/'} className="btn btn-outline-success my-2 my-sm-0">Cerrar sesión</Link>
                </li>

              </ul>
            </div>
          </nav>
    
          <Forum />
        </div>
        ) : (<Redirect to="/" /> )
      }

    </Route>   

  );
}

export default Home;
