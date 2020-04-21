import React, {Component} from 'react';
import User from './User';
import Modal from "./Modal";

class UserResults extends Component{

    constructor() {
        super();
        this.state = {
        loading: true,
          users: [],
          showModal: false,
          emailDelete: ""
        };
      }



      async updateUsers(){

        var usersFromFirebase = []
       await window.firebase.firestore().collection("users").get().then(querySnapshot => {
            querySnapshot.forEach(doc => {

                usersFromFirebase.push(doc.data())
                console.log( doc.data());
            });

            
        });
        this.setState({
            users: usersFromFirebase,
            loading: false,
            showModal: false
        })
        
        console.log('hizofetch',this.state);
    }


    async activationUser(email, value){

        //console.log('lol', email , value)
        window.firebase.firestore().collection("users").doc(email).update({"active" : value});


         setTimeout(() => {
             this.updateUsers();
           }, 1000);

    }

    


    deleteUser(email){

        let hasMessages = false;

        window.firebase.firestore().collection("messages").where("user.email", "==", email).get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                if(doc.exists){
                    hasMessages = true;
                    
                }
            });
            if(hasMessages){
                alert('posee mensajes asociados, no se puede eliminar');
            }
            else{
            alert('Eliminado Exitosamente!');
            window.firebase.firestore().collection('users').doc(email).delete().then(function() {
                //alert('Eliminado Exitosamente!');
            }).catch(function(error) {
                console.error("Error removing document: ", error);
            });
        }
            
            
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
        this.setState({loading:true});
        //importante esperar para que firebase se actualice, esto me tuvo hasta las 3 am
       setTimeout(() => {
            this.updateUsers();
          }, 3000);

          
        

    
    }


  

    componentDidMount(){
        //cargar los usuarios
        this.updateUsers();
    }

    deleteAction(email){
            this.setState({ emailDelete: email, showModal: !this.state.showModal});
    }

    


    render (){

        if (this.state.loading) {
            return <h1>Loading ...</h1>;
          }

          
          const { users, showModal, emailDelete } = this.state;
          return (

            <div >
                {
                    users.length === 0 ?
                    (<h1>No Users found</h1>) : (
                        users.filter((user) => user.email !== JSON.parse(sessionStorage.getItem("admin")).email ).map((user) => (
                            <div key={user.email} className="media user m-5">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1200px-Circle-icons-profile.svg.png" className="size-image mr-3 p-3" alt="..." />
                            <div  className="w-50">
                                
                                <h3 className="media-heading">Email: {user.email} <span className={user.active ? "badge badge-success" : "badge badge-danger"}>{user.active ? "Activo" : "Inactivo"}</span></h3>
                                <h3 className="media-heading">firstName: {user.firstName}</h3>
                                <h3 className="media-heading">lastName: {user.lastName}</h3>
                                
                            </div>
                        <button className={user.active ? "btn btn-danger" : "btn btn-success"}  onClick={() => this.activationUser(user.email, !user.active)}>{user.active ? "Desactivar" : "Activar"}</button>
                          <button className="btn btn-dark ml-5" value={user.email} onClick={e => this.deleteAction(e.target.value)}>Borrar</button>
                          
                         
                          </div>
                        ))
                    )
                }
                 {showModal ? (
            <Modal>
              <div>
                <h1>Desea eliminar a {emailDelete}?</h1>
                <button onClick={() => this.deleteUser(emailDelete)}>Sí</button>
                <button onClick={() => this.deleteAction("")}>
                  No
                </button>
              </div>
            </Modal>
          ) : null}
            </div>
        );
    }

}

export default UserResults;


