import React from 'react'
import logo from '../../public/media/logo.png'

import '../css/header.css'

const Header = ({ title, version, subtitle }) => {
	return (
		<div id="header">
			<div className="header-inner">
				<div className="header-logo">
					<a href="/" title="Game Grid">
						<img src={logo} alt="Logo"></img>
					</a>
				</div>
				<div className="header-text">
					<h1 className="header-title">
						{title}
						<span>{version}</span>
					</h1>
					<p className="header-date">{subtitle}</p>
				</div>
			</div>
		</div>
	)
}

export default Header
