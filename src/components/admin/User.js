import React from 'react';

export default function User({email, firstName, lastName, active }){


    return (
        <div className="media user m-5">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1200px-Circle-icons-profile.svg.png" className="size-image mr-3 p-3" alt="..." />
            <div className="media-body">
                <h3 className="media-heading">Email: {email} <span className={active ? "badge badge-success" : "badge badge-danger"}>{active ? "Activo" : "Inactivo"}</span></h3>
                <h3 className="media-heading">firstName: {firstName}</h3>
                <h3 className="media-heading">lastName: {lastName}</h3>
                
            </div>
        </div>

    );
}

