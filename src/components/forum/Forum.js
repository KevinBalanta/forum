import React, { Component } from 'react';
import Message from './Message';


class Forum extends Component {

    constructor(){
        super();
        this.state = {
            messages: []
        }
    }

    componentDidMount(){

        window.firebase.database().ref('messages/').on('value', snapshot=> {
            const currentMessages = snapshot.val();
            
            if(currentMessages !== null ) {
                this.setState({            
                    messages: currentMessages 
                })
            }
        });

        console.log(this.state);
    }

    render() {

        const { messages } = this.state;

        return (
            <div className='container'>
                 {messages.map(message => (
                <Message key={message.id} 
                message={message}/>
            ))}
            </div>
        );
    }
}

export default Forum