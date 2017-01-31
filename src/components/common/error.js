import React from 'react'

import '../../css/error.css'

const Error = ({ heading, subtitle, list }) => {
	
	let mapList = list.map( (item, index) => <li key={index}>{item}</li> )
	
	return (
		<div className="container error-msg">
			<div className="row">
				<div className="col-md-12">
					<div className="error-msg-icon">
						<i className="material-icons">error</i>
					</div>
					<h1>{heading}</h1>
					<h2>{subtitle}</h2>
					<ul>{mapList}</ul>
				</div>
			</div>
		</div>
	)
}

export default Error
