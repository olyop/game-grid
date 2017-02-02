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
				style={ this.state.close ? { display: 'none' } : null }
				id="banner"
			>
				<p>{this.props.text}</p>
				<i
					className="material-icons"
					onClick={ () => this.setState({ close: true }) }
				>close</i>
			</div>
		)
	}
}

export default Banner
