import React from 'react'

import '../css/banner.css'

class Banner extends React.Component {
	
	constructor() {
		super()
		
		this.state = { close: false }
	}
	
	render() {
		
		let style = this.state.close ? { display: 'none' } : {}
		
		return (
			<div id="banner" style={style}>
				<div className="banner-inner">
					<p>{this.props.text}</p>
					<i
						className="material-icons"
						onClick={ () => this.setState({ close: true }) }
					>close</i>
				</div>
			</div>
		)
	}
}

export default Banner