import React, { useState } from 'react'

const Message = (props) => {


	const date = new Date(props.message.date.seconds * 1000 + props.message.date.nanoseconds/1000)
	const formatDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}    ${date.getHours()}:${date.getMinutes()}`
	console.log(date)

	const onClickMessage = e => {
		e.preventDefault();
		props.parentCallback(props.message)
		
	}

	return (

		<div className="media message mb-1">
			<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1200px-Circle-icons-profile.svg.png" className="size-image mr-3 p-3" alt="..." />
			<div className="media-body  p-3">
				<a className="mt-0 btn-outline-danger" href=""  onClick={onClickMessage} ><strong>{props.message.title}</strong></a>

				<h4>{props.message.description}</h4>	
			</div>
			<div className="m-4 center-block">
			<h4 className="mb-4 align-middle"> {props.message.replies.length} respuestas</h4>
			<h5>{props.message.user.firstName + " " + props.message.user.lastName} </h5>
			<h5>{formatDate}</h5>

			</div>

		</div>

	);

}


export default Message