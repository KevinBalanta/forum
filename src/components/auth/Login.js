import React from 'react'

const onChange = () => {

}


const Login = () => {
    return (
        <div className="form-login">
            <div className="container-form">
                <h1>Iniciar Sesión</h1>
                <form>
                    <div className="element-form">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Tu Email"
                            onChange={onChange}/>
                    </div>

                    <div className="element-form">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Tu Contraseña"
                            onChange={onChange}/>
                    </div>

                    <div className="element-form">
                        <input type="submit" className="btn btn-primary btn-block" value="Iniciar Sesión"/>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login 