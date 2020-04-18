import React, {useState} from "react";
import Forum from "./Forum";
import { Route, Redirect, Link } from "react-router-dom";
import Profile from "./Profile";
import Search from "./Search";


const Home = () => {
  
  const FORUM = 'forum'
  const PROFILE = 'profile'
  const SEARCH = 'search'

  const [page, changePage] = useState({
     actualState : FORUM 
    })
    
  const [search, stateSearch] = useState({
    inputSearch : ''
    })

  const onChangeSearch = (e) => {
    stateSearch({
        inputSearch : e.target.value
    })
  }

  const onSubmitSearch = e => {
    e.preventDefault();
    changePage({
      actualState : SEARCH
    })
  }
  
  const changeToProfile = () => {
    changePage({
      actualState : PROFILE
    })
  }

  const changeToForum = () => {
    changePage({
      actualState : FORUM
    })
  }

  return (
    <Route>
      {
        sessionStorage.getItem('user') ? (
          <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

            <button className="btn btn-outline-danger my-2 my-sm-0" onClick={changeToForum}>Forum</button>
            
            <div className="collapse navbar-collapse ml-5" id="navbarSupportedContent">
            <form className="form-inline mr-auto" onSubmit={onSubmitSearch}>
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  value = {search.inputSearch}
                  placeholder="Buscar"
                  aria-label="Search"
                  onChange={onChangeSearch}
                />
                <button className="btn btn-outline-danger my-2 my-sm-0" type="submit">
                  Buscar
                </button>
              </form>
    
              <ul className="navbar-nav my-2 my-lg-0">
                <li>
                  <button className="btn btn-outline-danger my-2 my-sm-0" onClick={changeToProfile}>Ver Perfil</button>
                </li>

                <li>
                <Link to= {'/'} className="btn btn-outline-danger my-2 my-sm-0">Cerrar sesión</Link>
                </li>

              </ul>
            </div>
          </nav>
        { (page.actualState === FORUM) ? <Forum/> : 
          (page.actualState === PROFILE) ? <Profile/> : <Search/> 
        }

        </div>
        ) : (<Redirect to="/" /> )
      }

    </Route>   

  );
}

export default Home;
