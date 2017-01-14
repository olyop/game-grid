import React from 'react'

import '../css/banner.css'

class Banner extends React.Component {
	
	constructor() {
		super()
		
		this.state = { close: false }
	}
	
	render() {
		return (
			<div
				id="banner"
				style={ this.state.close ? { display: 'none' } : {} }
				onClick={ () => this.setState({ close: true }) }
			>
				<p>{this.props.text}</p>
				<i className="material-icons">close</i>
			</div>
		)
	}
}

export default Banner