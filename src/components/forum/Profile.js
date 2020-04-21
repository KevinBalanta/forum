import React, { useState } from 'react'

const Profile = (props) => {

    var userSaved = (sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')) : JSON.parse(sessionStorage.getItem('admin'));

    const [user, saveUser] = useState({
        firstName: userSaved.firstName,
        lastName: userSaved.lastName,
        email: userSaved.email,
        password: '',
        active: userSaved.active
    })

    const [enable, changeEnable] = useState({
        isDisabled: true,
        valueButton: "Editar informacion"
    })

    const [error, changeError] = useState({
        error: false,
        message: ''
    })

    const { firstName, lastName, email, password, active } = user;

    const onChange = (e) => {
        saveUser({
            ...user,
            [e.target.name]: e.target.value
        })

        changeError({
            error: false,
            message: ''
        })
    }

    const onSubmit = e => {
        e.preventDefault();

        if (enable.isDisabled) {

            changeEnable({
                isDisabled: false,
                valueButton: "Confirmar cambios"
            })

        } else {

            //Hacer validaciones aqui
            if (firstName.trim() === '' || lastName.trim() === '' || email.trim() === '' ||
                password.trim() === '' ) {

                changeError({
                    error: true,
                    message: 'No pueden haber campos vacios'
                })


                return;
            }
            if (password.length < 6) {
                changeError({
                    error: true,
                    message: 'La contraseña debe tener al menos 6 caracteres'
                })
                return;
            }

            const bcrypt = require('../../utils/custom-bcrypt');
            const hashPassword = bcrypt.hash(user.password);
            

            const userFirebase = {

                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: hashPassword,
                active : user.active
            }

            console.log(user)
            
            window.firebase.firestore().collection("users").doc(userFirebase.email).set(userFirebase)

            changeEnable({
                isDisabled: true,
                valueButton: "Editar informacion"
            })
            console.log(user)
        }

    }



    return (
        <div className="form-login">
            <div className="container-form">
                <h1>PERFIL</h1>
                <form onSubmit={onSubmit}>

                    <div className="element-form">
                        <label htmlFor="firstName">Nombres</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={firstName}
                            placeholder="Nombres"
                            onChange={onChange}
                            disabled={enable.isDisabled} />
                    </div>


                    <div className="element-form">
                        <label htmlFor="lastName">Apellidos</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={lastName}
                            placeholder="Apellidos"
                            onChange={onChange}
                            disabled={enable.isDisabled} />
                    </div>

                    <div className="element-form">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            placeholder="Email"
                            onChange={onChange} 
                            disabled={enable.isDisabled}/>
                    </div>

                    <div className="element-form">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            placeholder="Contraseña"
                            onChange={onChange}
                            disabled={enable.isDisabled} />
                    </div>


                    <div className="element-form">
                        <input type="submit" className="btn btn-primary btn-block" value={enable.valueButton} />
                    </div>
                </form>

                {error.error &&
                    <div className="alert alert-danger" role="alert">{error.message}</div>
                }
            </div>
        </div>
    );
}

export default Profile; 