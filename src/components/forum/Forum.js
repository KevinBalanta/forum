import React, { Component } from 'react';
import Message from './Message';


class Forum extends Component {

    constructor(props){
        super(props);
        this.state = {
            messages: []
        }
    }
    componentDidMount(){
        var messagesFromFirebase = []

        window.firebase.firestore().collection("messages").get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                
                messagesFromFirebase.push(doc.data())
                console.log(doc.id, " => ", doc.data());
            });

            this.setState({
                messages: messagesFromFirebase
            })
        });
        

        console.log(this.state);
    }

    render() {

        const { messages } = this.state;

        return (
            <div className='container'>
                <h1 className="m-4 title-forum">Publicaciones del Foro</h1>
                 {messages.map(message => (
                <Message key={message.id} 
                message={message}/>
            ))}
            </div>
        );
    }
}

export default Forum