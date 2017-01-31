import React from 'react'

import '../css/banner.css'

class Banner extends React.Component {
	
	constructor() {
		super()
		
		this.state = { close: false }
	}
	
	render() {
		
		if (this.props.dev) {
			return null
		}
		
		let style = this.state.close ? { display: 'none' } : null
		
		return (
			<div id="banner" style={style}>
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