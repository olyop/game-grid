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
		
		let homeTeam = this.props.homeTeam,
				awayTeam = this.props.awayTeam
		
		console.log(homeTeam.PrimaryColor, awayTeam.PrimaryColor)
		
		let homeBackgroundStyle = {
			backgroundImage: 'url(./media/team-logos/' + homeTeam.Key + '.svg)',
			backgroundColor: '#' + homeTeam.PrimaryColor
		}
		let awayBackgroundStyle = {
			backgroundImage: 'url(./media/team-logos/' + awayTeam.Key + '.svg)',
			backgroundColor: '#' + awayTeam.PrimaryColor
		}
		
		return (
			<div className="game-content">
				<div className="container-fluid game-content-inner">
					<div className="col-md-6" style={homeBackgroundStyle}>
						<p>Home</p>
					</div>
					<div className="col-md-6" style={awayBackgroundStyle}>
						<p>Away</p>
					</div>
				</div>
			</div>
		)
	}
}

export default GameExpand