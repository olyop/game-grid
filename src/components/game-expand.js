import React from 'react'

import '../css/game-expand.css'

class GameExpand extends React.Component {
	
	hexToRgba(hex, opacity) {
		let c
		if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
			c = hex.substring(1).split('')
			if(c.length === 3){
				c = [c[0], c[0], c[1], c[1], c[2], c[2]]
			}
			c = '0x'+c.join('');
				return 'rgba(' + [(c>>16)&255, (c>>8)&255, c&255].join(',') + ',' + opacity + ')' 
		}
		return 'rgba(0,0,0,' + opacity + ')'
	}
	
	render() {
		
		let m = this.props.m
		
		const opacity = 0.60;
		
		let homeBackgroundStyle = {
			backgroundImage: 'url(./media/team-logos/' + m.homeTeam.Key + '.svg)',
			backgroundColor: m.homeColor.color,
			boxShadow: 'inset 0px 0px 200px 25px ' + this.hexToRgba(m.homeColor.color, opacity)

		}
		let awayBackgroundStyle = {
			backgroundImage: 'url(./media/team-logos/' + m.awayTeam.Key + '.svg)',
			backgroundColor: m.awayColor.color,
			boxShadow: 'inset 0px 0px 200px 25px ' + this.hexToRgba(m.awayColor.color, opacity)

		}
		
		return (
			<div className="game-content">
				<div className="container-fluid game-content-inner">
					<div className="col-md-6" style={homeBackgroundStyle}>
						<div className="game-content-title">
							<p>{m.homeTeam.City}</p>
							<h1>{m.homeTeam.Name}</h1>
						</div>
					</div>
					<div className="col-md-6" style={awayBackgroundStyle}>
						
					</div>
				</div>
			</div>
		)
	}
}

export default GameExpand