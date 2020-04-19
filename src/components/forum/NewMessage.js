import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';

const NewMessage = (props) => {
    
    const [message, saveMessage] = useState({
        id: '',
        title: '',
        description: '',
        date: '',
        user: JSON.parse(sessionStorage.getItem('user')),
        replies : []
    })

    const [error, changeError] = useState({
        error: false,
        message : ''
    })

    const {id, title, description, date, user, replies} = message;
    
    const onChange = (e) => {
        saveMessage({
            ...message,
            [e.target.name] : e.target.value
        })

        changeError({
            error: false,
            message: ''
        })
    }

    const onSubmit = e => {
        e.preventDefault();
        if(title.trim() === '' || description.trim() === '' ){
            
            changeError({
                error: true,
                message: 'No pueden haber campos vacios'
            })
            return;
        }

        saveMessage({
            ...message,
            date : window.firebase.firestore.Timestamp.fromDate(new Date())
        })

        window.firebase.firestore().collection("messages").add({
            message
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            saveMessage({
                ... message,
                id : docRef.id
            })
            const messageFirebase = {
                id: docRef.id,
                title: title,
                description: description,
                date: window.firebase.firestore.Timestamp.fromDate(new Date()),
                user: JSON.parse(sessionStorage.getItem('user')),
                replies : replies
            }
            window.firebase.firestore().collection("messages").doc(docRef.id).set(messageFirebase)
            
            saveMessage({
                id: '',
                title: '',
                description: '',
                date: '',
                user: JSON.parse(sessionStorage.getItem('user')),
                replies : []
            })
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    }

    return (
        <div className="form-login">
            <div className="container-new-message">
                <h1>Nueva Publicacion</h1>
                <form onSubmit={onSubmit}>

                    <label htmlFor="email">Titulo</label>
                    <div className="element-form">
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value = {title}
                            placeholder="Escribe el titulo de la publicacion"
                            onChange={onChange}/>
                    </div>

                    <label htmlFor="password">Descripcion</label>
                    <div className="element-form">
                        <textarea className="form-control textarea" 
                            id="description" 
                            name="description"
                            value={description}
                            placeholder="Escribe la descripcion de la publicacion"
                            onChange={onChange}
                            rows="5"/>
                    </div>

                    <div className="element-form">
                        <input type="submit" className="btn btn-primary btn-block" value="Publicar"/>
                    </div>
                </form>
                {error.error &&
                            <div className="alert alert-danger" role="alert">{error.message}</div>
                        }
            </div>
        </div>
    );
}

export default NewMessage 