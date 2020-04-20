import React, { Component } from 'react';
import Message from './Message';


class Forum extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            comment: ''
        }

        this.getSelectedMessage = this.getSelectedMessage.bind(this);
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

    }
    componentDidMount() {
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

    getSelectedMessage = (messageSelected) => {
        this.setState({ 
            message: messageSelected,
            messageError: '' 
         })
    }
    
    getEditMessage = (message) => {
        this.props.editMessage(message)
    }

    
    getDeleteMessage = (message) => {
        this.componentDidMount()
    }

    onChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.name] : e.target.value,
            errorMessage : ''
        })

    }

    onSubmit = e => {
        e.preventDefault();
        if(this.state.comment.trim() === '' ){
            
            this.setState({
                ...this.state,
                messageError: 'No pueden haber campos vacios'
            })
            return;
        }

        const newMessage = this.state.message;
        const completeComment = {
            id : this.state.message.replies.length,
            description : this.state.comment,
            user: JSON.parse(sessionStorage.getItem('user')),
        }
        newMessage.replies.push(completeComment)

        this.setState({
            message : newMessage,
            comment : '',
            errorMessage : ''
        })

        console.log(newMessage)
        window.firebase.firestore().collection("messages").doc(newMessage.id).set(this.state.message)

    }

    render() {

        const { messages } = this.state;

        if (this.state.message) {

            const { id, title, description, date, user, replies } = this.state.message;

            const dateType = new Date(date.seconds * 1000 + date.nanoseconds / 1000)
            const formatDate = `${dateType.getDate()}-${dateType.getMonth() + 1}-${dateType.getFullYear()}    ${dateType.getHours()}:${dateType.getMinutes()}`

            return (
                <div className='container'>
                    <div className="media message m-5 ">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1200px-Circle-icons-profile.svg.png" className="size-image mr-3 p-3" alt="..." />
                    <div className="media-body  p-3">
                        <h3 className="mt-0"><strong>{title}</strong></h3>
                        <h4>{description}</h4>

                        {
                            replies.map(reply => (
                                
                                <div class="media message m-5"key={reply.id}>
                                <a class="mr-3" href="#">
                                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1200px-Circle-icons-profile.svg.png" className="size-image mr-3 p-3" alt="..."/>
                                </a>
                                <div class="media-body pt-4">
                                    <h5 class="mt-0">{reply.user.firstName + " " + reply.user.lastName}</h5>
                                   {reply.description}
                                </div>
                              </div>
                            ))
                        }

                    </div>
                    <div className="m-4 center-block">
                        <h4 className="mb-4 align-middle"> {replies.length} respuestas</h4>
                        <h5>{user.firstName + " " + user.lastName} </h5>
                        <h5>{formatDate}</h5>
                    </div>

                </div>

                     <form onSubmit={this.onSubmit} >
                            <div className="element-form">
                                <textarea className="form-control textarea"
                                    id="comment"
                                    name="comment"
                                    value={this.state.comment}
                                    placeholder="Comentarios"
                                    onChange={this.onChange}
                                    rows="3" />
                            </div>
                            <input type="submit" className="btn btn-dark btn-block" value="Comentar" />
                        </form>
                        {this.state.errorMessage &&
                            <div className="alert alert-danger" role="alert">{this.state.errorMessage}</div>
                        }
                </div>
            );

        } else {
            return (
                <div className='container'>
                    <h1 className="m-4 title-forum">Publicaciones del Foro</h1>
                    {messages.map(message => (
                        <Message key={message.id}
                            message={message} parentCallback={this.getSelectedMessage} 
                            parentCallbackEdit={this.getEditMessage} parentCallbackDelete={this.getDeleteMessage} />
                    ))}
                </div>
            );
        }

    }
}

export default Forum