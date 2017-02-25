import React from 'react'

import '../../css/button.css'

const Button = ({ hasIcon, hover, iconText, text, style }) => {
	
	let icon = hasIcon ? <i className="material-icons">{iconText}</i> : null,
			buttonText = text === '' ? null : <p>{text}</p>,
			classText = hover ? 'button' : 'button button-no-hover'
	
	return (
		<button className={classText} style={style}>
			{icon}
			{buttonText}
		</button>
	)
}

Button.defaultProps = {
	hover: true,
	text: ''
}

Button.propTypes = {
	hasIcon: React.PropTypes.bool.isRequired,
	hover: React.PropTypes.bool,
	iconText: React.PropTypes.string,
	text: React.PropTypes.string
}

export default Button
