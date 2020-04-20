import React, {Component} from 'react'
import { Link } from 'react-router-dom';

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: props.firstName,
            lastName: "",
            email: "",
            active: true,
            numMessages: 0
        }
    }

    componentDidMount() {

    window.firebase.firestore().collection("users").where("firstName", "==", this.state.firstName)
    .get()
    .then((querySnapshot) => {
        console.log(querySnapshot);
        querySnapshot.forEach((doc) => {
            if(doc.data().firstName){
                var countNum = 0;
                window.firebase.firestore().collection("messages").where("user.email", "==", doc.data().email)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        countNum++;
                        console.log(countNum)
                        console.log(doc.id, " =>>>>>>>>>>>>> ", doc.data());
                        this.setState({
                            numMessages : countNum
                        })
                    });
                })
                .catch(function(error) {
                    console.log("Error getting documents: ", error);
                });
                console.log("--------> " + countNum)
                this.setState({
                    firstName: doc.data().firstName,
                    lastName: doc.data().lastName,
                    email: doc.data().email,
                    active: doc.data().active,
                    numMessages: countNum
                });
            }
            console.log(doc.id, " =>>>>>>>>>>>>> ", doc.data());
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
    
    }
    
    render(){

        if(this.state.email){
            return (
                <div className="form-login">
                    <div className="container-form">
                        <h1>Datos de la busqueda</h1>
                            <div className="element-form">
                                <label htmlFor="firstName">Nombres</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={this.state.firstName}
                                    disabled />
                            </div>
        
                            <div className="element-form">
                                <label htmlFor="lastName">Apellidos</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={this.state.lastName}
                                    disabled/>
                            </div>
        
                            <div className="element-form">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={this.state.email}
                                    disabled/>
                            </div>
        
                            {this.state.active &&
                                <div className="alert alert-success" role="alert">
                                El usuario esta activo
                              </div>
                            }
                            {!this.state.active &&
                                <div className="alert alert-danger" role="alert">
                                El usuario esta inactivo
                              </div>
                            }
                            
                            <label className="element-form"> Numero de mensajes : { this.state.numMessages }</label>
                    </div>
                </div>
            );
        }else{
            return (
                <div className="form-login">
                    <div className="container-form">
                        <h1>No se encontro ningún usuario con ese nombre</h1>
                    </div>
                </div>
            );
        }

    }

    
    
}

export default Search 