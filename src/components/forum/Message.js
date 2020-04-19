import React, { useState } from 'react'

const Message = (props) => {

	const date = new Date(props.message.date.seconds * 1000 + props.message.date.nanoseconds/1000)
	const formatDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}    ${date.getHours()}:${date.getMinutes()}`
	console.log(date)

	const onClickMessage = e => {
		e.preventDefault();
		
	}

	return (

		<div className="media message mb-1">
			<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1200px-Circle-icons-profile.svg.png" class="size-image mr-3 p-3" alt="..." />
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

        /*<div className="card mt-5">
	    <div className="card-body">
	        <div className="row">
        	    <div className="col-md-2">
        	        <img src="https://cdn4.iconfinder.com/data/icons/e-commerce-181/512/477_profile__avatar__man_-512.png" className="img img-rounded img-fluid"/>
        	        <p className="text-secondary text-center">15 minutos</p>
        	    </div>
        	    <div className="col-md-10">
        	        <p>
        	            <a className="float-left" href="https://maniruzzaman-akash.blogspot.com/p/contact.html"><strong>{ props.message.user.firstName }</strong></a>
        	            <span className="float-right"><i className="text-warning fa fa-star"></i></span>
                        <span className="float-right"><i className="text-warning fa fa-star"></i></span>
        	            <span className="float-right"><i className="text-warning fa fa-star"></i></span>
        	            <span className="float-right"><i className="text-warning fa fa-star"></i></span>

        	       </p>
        	       <div className="clearfix"></div>
        	        <p>{ props.message.description }</p>
					<form>
						<input></input>
						<button className="btn btn-primary">Comentar</button>
					</form>
        	    </div>
	        </div>
        </div>
		</div>*/

	);

}


export default Message