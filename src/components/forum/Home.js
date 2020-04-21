import React, { useState } from "react";
import Forum from "./Forum";
import { Route, Redirect, Link } from "react-router-dom";
import Profile from "./Profile";
import Search from "./Search";
import NewMessage from "./NewMessage";



const Home = () => {

  const FORUM = 'forum'
  const PROFILE = 'profile'
  const SEARCH = 'search'
  const NEW_MESSAGE = 'newMessage'
  const EDIT_MESSAGE = 'editMessage'


  const [page, changePage] = useState({
    actualState: FORUM
  })

  const [search, stateSearch] = useState({
    inputSearch: ''
  })

  const [keys, changeKey] = useState({
    keyForum: 0,
    keySearch : 0
  })

  const onChangeSearch = (e) => {
    stateSearch({
      inputSearch: e.target.value
    })
  }

  const onSubmitSearch = e => {
    e.preventDefault();
    changePage({
      actualState: SEARCH
    })
    const newKey = keys.keySearch + 1
    changeKey({
      ...keys,
      keySearch : newKey
    })
  }

  const changeToProfile = () => {
    changePage({
      actualState: PROFILE
    })
  }

  const changeToForum = () => {
    changePage({
      actualState: FORUM
    })
    const newKey = keys.keyForum + 1
    changeKey({
      ...keys,
      keyForum : newKey
    })
  }

  const changeToNewMessage = () => {
    changePage({
      actualState: NEW_MESSAGE
    })
  }

  const editMessageHome = (message) => {
    if(message){
       changePage({
        actualState: EDIT_MESSAGE,
        message : message
       })
    }
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
                    value={search.inputSearch}
                    placeholder="Buscar"
                    aria-label="Search"
                    onChange={onChangeSearch}
                  />
                  <button className="btn btn-outline-danger my-2 my-sm-0" type="submit">
                    Buscar
                </button>
                </form>

                <button className="btn btn-danger my-2 my-sm-0 m-5" onClick={changeToNewMessage}>Publicar Mensaje</button>

                <ul className="navbar-nav my-2 my-lg-0">
                  <li>
                    <button className="btn btn-outline-danger my-2 my-sm-0" onClick={changeToProfile}>Ver Perfil</button>
                  </li>

                  <li>
                    <Link to={'/'} className="btn btn-outline-danger my-2 my-sm-0">Cerrar sesión</Link>
                  </li>

                </ul>
              </div>
            </nav>
            {(page.actualState === FORUM) ? <Forum key={keys.keyForum} editMessage={editMessageHome} /> :
             (page.actualState === PROFILE) ? <Profile /> :
             (page.actualState === SEARCH) ? <Search firstName={search.inputSearch} key={keys.keySearch}/> :
             (page.actualState === NEW_MESSAGE)  ?  <NewMessage /> : <NewMessage message={page.message}/>
            }

          </div>
          ) : sessionStorage.getItem('admin') ? (<Redirect to="/home-admin" /> ) : (<Redirect to="/" /> )

      }

    </Route>

  );
}

export default Home;
