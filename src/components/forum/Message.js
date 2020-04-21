import React, { useState } from 'react'

const Message = (props) => {


	const date = new Date(props.message.date.seconds * 1000 + props.message.date.nanoseconds/1000)
	const formatDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}    ${date.getHours()}:${date.getMinutes()}`
	console.log(date)

	const onClickMessage = e => {
		e.preventDefault();
		props.parentCallback(props.message)
		
	}

	const onClickEdit = e => {
		e.preventDefault();
		props.parentCallbackEdit(props.message)
		
	}

	const onClickDelete = e => {
		e.preventDefault();
		props.parentCallbackDelete(props.message)
		window.firebase.firestore().collection("messages").doc(props.message.id).delete()
		
	}
	const ownMessage = (props.message.user.email === JSON.parse(sessionStorage.getItem('user')).email);

	return (

		<div className="media message mb-1">
			<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1200px-Circle-icons-profile.svg.png" className="size-image mr-3 p-3" alt="..." />
			<div className="media-body  p-3">
				<a className="mt-0 btn-outline-danger" href=""  onClick={onClickMessage} ><strong>{props.message.title}</strong></a>

				<h4>{props.message.description}</h4>
				{ownMessage &&
                            <a className="mt-2 mr-5 pt-1 pb-1 pl-5 pr-5 btn btn-danger" role="alert" onClick={onClickEdit}>  Editar  </a>
                    }
				{ownMessage &&
                            <a className="mt-2 pt-1 pb-1 pl-5 pr-5 btn btn-danger" role="alert" onClick={onClickDelete}>  Eliminar  </a>
                    }
			</div>
			<div className="m-4 center-block">
			<a className="mb-4 align-middle" href="/" onClick={onClickMessage}> {props.message.replies.length} respuestas</a>
			<h5>{props.message.user.firstName + " " + props.message.user.lastName} </h5>
			<h5>{formatDate}</h5>

			</div>

		</div>

	);

}


export default Message