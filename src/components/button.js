import React from 'react'

import '../css/button.css'

const Button = ({ hasIcon, iconText, text, margin }) => {
	
	let icon = hasIcon ? <i className="material-icons">{iconText}</i> : null,
			style = {
				margin: margin
			}
	
	return (
		<button className="button" style={style}>
			{icon}
			<p>{text}</p>
		</button>
	)
}

Button.propTypes = {
	hasIcon: React.PropTypes.bool,
	iconText: React.PropTypes.string,
	text: React.PropTypes.string,
	margin: React.PropTypes.string
}

export default Button