import React, {useState} from 'react'

const Message = (props) => {


    return (
        
        <div className="card mt-5">
	    <div className="card-body">
	        <div className="row">
        	    <div className="col-md-2">
        	        <img src="https://cdn4.iconfinder.com/data/icons/e-commerce-181/512/477_profile__avatar__man_-512.png" className="img img-rounded img-fluid"/>
        	        <p className="text-secondary text-center">15 Minutes Ago</p>
        	    </div>
        	    <div className="col-md-10">
        	        <p>
        	            <a className="float-left" href="https://maniruzzaman-akash.blogspot.com/p/contact.html"><strong>{ props.message.user }</strong></a>
        	            <span className="float-right"><i className="text-warning fa fa-star"></i></span>
                        <span className="float-right"><i className="text-warning fa fa-star"></i></span>
        	            <span className="float-right"><i className="text-warning fa fa-star"></i></span>
        	            <span className="float-right"><i className="text-warning fa fa-star"></i></span>

        	       </p>
        	       <div className="clearfix"></div>
        	        <p>{ props.message.text }</p>
					<form>
						<input></input>
						<button className="btn-primary">Comentar</button>
					</form>
        	    </div>
	        </div>
        </div>
        </div>);

}


export default Message