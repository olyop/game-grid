import React from 'react'
import '../css/header.css'
import logo from '../../public/media/logo.png'

class Header extends React.Component {
	render() {
		return (
			<div id="header">
				<div className="header-inner">
					<div className="header-logo">
						<a href="/" title="Game Grid">
							<img src={logo} alt="Logo"></img>
						</a>
					</div>
					<div className="header-text">
						<h1 className="header-title">Game Grid</h1>
						<p className="header-date">An unofficial NBA schedule viewer</p>
					</div>
				</div>
			</div>
		)
	}
}

export default Header