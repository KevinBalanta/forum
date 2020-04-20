import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';

const Register = (props) => {


    sessionStorage.removeItem('user');

    const [user, saveUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        active : true
    })

    const [error, changeError] = useState({
        error: false,
        message : ''
    })
    
    const {firstName, lastName, email, password, confirmPassword, active} = user;
    
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

        //Hacer validaciones aqui
        if(firstName.trim() === '' || lastName.trim() === '' || email.trim() === '' || 
            password.trim() === '' || confirmPassword.trim() === '' ){
                
                changeError({
                    error: true,
                    message: 'No pueden haber campos vacios'
                })


                return;
            }
        if(password.length < 6 ){
            changeError({
                error: true,
                message: 'La contraseña debe tener al menos 6 caracteres'
            })
            return;
        }

        if(password !== confirmPassword){
            changeError({
                error: true,
                message: 'Las contraseñas no concuerdan'
            })
            return;
        }

        const bcrypt = require('../../utils/custom-bcrypt');
        const hashPassword = bcrypt.hash(user.password);
        saveUser({
            ...user,
            password : hashPassword
        })
        
        const userFirebase = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashPassword,
            active : active
        }

        window.firebase.firestore().collection('users').doc(user.email).get().then(function(doc){
            if (doc.exists) {

                changeError({
                    error: true,
                    message: 'El email ya se encuentra registrado'
                })

                saveUser({
                    ...user,
                    email : '',
                    password : '',
                    confirmPassword : ''
                })
            } else {
                window.firebase.firestore().collection("users").doc(userFirebase.email).set(userFirebase)
                sessionStorage.setItem('user', JSON.stringify(userFirebase));
                props.history.push('/home');
            }
        });
    }

    return (
        <div className="form-login">
            <div className="container-form">
                <h1>Registrarse</h1>
                <form onSubmit={onSubmit}>

                    <div className="element-form">
                        <label htmlFor="firstName">Nombres</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value = {firstName}
                            placeholder="Nombres"
                            onChange={onChange}/>
                    </div>


                    <div className="element-form">
                        <label htmlFor="lastName">Apellidos</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value = {lastName}
                            placeholder="Apellidos"
                            onChange={onChange}/>
                    </div>

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
                        <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value = {confirmPassword}
                            placeholder="Reescribe tu contraseña"
                            onChange={onChange}/>
                    </div>

                    <div className="element-form">
                        <input type="submit" className="btn btn-primary btn-block" value="Registrarse"/>
                    </div>
                </form>

                <Link to= {'/'} className="link-account">
                    Inicio de sesión
                </Link>
                {error.error &&
                            <div className="alert alert-danger" role="alert">{error.message}</div>
                        }
            </div>
        </div>
    );
}

export default Register; 