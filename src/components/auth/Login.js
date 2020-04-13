import React, {useState} from 'react'
import { Link } from 'react-router-dom';


const Login = (props) => {

    const [user, saveUser] = useState({
        email: '',
        password: ''
    })

    const [error, changeError] = useState({
        error: false,
        message : ''
    })
    
    
    const {email, password} = user;
    
    const onChange = (e) => {
        saveUser({
            ...user,
            [e.target.name] : e.target.value
        })

        changeError({
            error: false,
            message: ''
        })
    }

    const onSubmit = e => {
        e.preventDefault();
        if(email.trim() === '' || password.trim() === '' ){
            
            changeError({
                error: true,
                message: 'No pueden haber campos vacios'
            })
            return;
        }

        window.firebase.database().ref( `users/${user.email.replace(/\./g, ",")}`).on('value', snapshot=> {
            const userFromFirebase = snapshot.val();
            if(userFromFirebase !== null ) {
                const bcrypt = require('../../utils/custom-bcrypt');

                if(bcrypt.compare(user.password, userFromFirebase.password)) {
                    sessionStorage.setItem('email', userFromFirebase.email);
                    sessionStorage.setItem('firstName', userFromFirebase.firstName);
                    props.history.push('/home');
                }else {
                    changeError({
                        error: true,
                        message: 'La contraseña es incorrecta'
                    })
                }   


            }else{
                changeError({
                    error: true,
                    message: 'El email no se encuentra registrado'
                })
            }
        });
    }

    return (
        <div className="form-login">
            <div className="container-form">
                <h1>Iniciar Sesión</h1>
                <form onSubmit={onSubmit}>
                    <div className="element-form">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value = {email}
                            placeholder="Email"
                            onChange={onChange}/>
                    </div>

                    <div className="element-form">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value = {password}
                            placeholder="Contraseña"
                            onChange={onChange}/>
                    </div>

                    <div className="element-form">
                        <input type="submit" className="btn btn-primary btn-block" value="Iniciar Sesión"/>
                    </div>
                </form>

                <Link to= {'/register'} className="link-account">
                    Registrarse
                </Link>
                {error.error &&
                            <div className="alert alert-danger" role="alert">{error.message}</div>
                        }
            </div>
        </div>
    );
}

export default Login 