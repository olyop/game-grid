import React from 'react'
import Request from 'react-http-request'
import Loading from './loading'

import '../css/game-expand.css'

class GetPlayersHome extends React.Component {
	render() {
		
		let m = this.props.m
		
		return (
			<Request
				url={'https://api.fantasydata.net/v3/nba/stats/JSON/Players/' + m.homeTeam.Key}
				headers={this.props.apiKey}
			>
				{
					({error, result, loading}) => {
						if (loading) {
							return <Loading />
						} else {
							let temp = result.body
							return (
								<Request
									url={'https://api.fantasydata.net/v3/nba/stats/JSON/PlayerSeasonStatsByTeam/' + this.props.date.getFullYear() + '/' + m.homeTeam.Key}
									headers={this.props.apiKey}
								>
									{
										({error, result, loading}) => {
											if (loading) {
												return <Loading />
											} else {
												return (
													<GetPlayersAway
														apiKey={this.props.apiKey}
														m={m}
														date={this.props.date}
														toggleExpand={this.props.toggleExpand}
														homeTeamPlayers={temp}
														homeTeamPlayerStats={result.body}
													/>
												)
											}
										}
									}
								</Request>
							)
						}
					}
				}
			</Request>
		)
	}
}

class GetPlayersAway extends React.Component {
	render() {
		
		let m = this.props.m;
		
		return (
			<Request
				url={'https://api.fantasydata.net/v3/nba/stats/JSON/Players/' + m.awayTeam.Key}
				headers={this.props.apiKey}
			>
				{
					({error, result, loading}) => {
						if (loading) {
							return <Loading />
						} else {
							let temp = result.body
							return (
								<Request
									url={'https://api.fantasydata.net/v3/nba/stats/JSON/PlayerSeasonStatsByTeam/' + this.props.date.getFullYear() + '/' + m.awayTeam.Key}
									headers={this.props.apiKey}
								>
									{
										({error, result, loading}) => {
											if (loading) {
												return <Loading />
											} else {
												return (
													<GameExpand
														apiKey={this.props.apiKey}
														m={m}
														date={this.props.date}
														toggleExpand={this.props.toggleExpand}
														homeTeamPlayers={this.props.homeTeamPlayers}
														homeTeamPlayerStats={this.props.homeTeamPlayerStats}
														awayTeamPlayers={temp}
														awayTeamPlayerStats={result.body}
													/>
												)
											}
										}
									}
								</Request>
							)
						}
					}
				}
			</Request>
		)
	}
}

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
		
		console.log(this.props)
		
		let m = this.props.m,
				logourl = './media/team-logos/'
		
		let homeStyle = {
			background: {
				backgroundColor: m.homeColor.color,
				boxShadow: 'inset 0px 0px 200px 25px ' + this.hexToRgba(m.homeColor.color, 0.60)
			},
			backgroundColor: {
				backgroundColor: m.homeColor.color
			}
		}
		let awayStyle = {
			background: {
				backgroundColor: m.awayColor.color,
				boxShadow: 'inset 0px 0px 200px 25px ' + this.hexToRgba(m.awayColor.color, 0.60)
			},
			backgroundColor: {
				backgroundColor: m.awayColor.color
			}
		}
		
		return (
			<div className="game-content">
				<div className="container-fluid game-content-inner">
					<div className="row">
						<div className="col-md-6 game-content-left" style={homeStyle.background}>
							<div className="game-content-title">
								<img src={logourl + m.homeTeam.Key + '.svg'} alt={m.homeTeam.Name} />
								<div className="game-content-title-text">
									<h2>{m.homeTeam.City}</h2>
									<h1>{m.homeTeam.Name}</h1>
									<p>{m.homeTeamRecord}</p>
								</div>
								<h2 style={m.homeScoreDisplay}>{m.homeScore}</h2>
							</div>
						</div>
						<div className="game-content-vs" onClick={this.props.toggleExpand}>
							<p>VS</p>
						</div>
						<div className="col-md-6 game-content-right" style={awayStyle.background}>
							<div className="game-content-title">
								<img src={logourl + m.awayTeam.Key + '.svg'} alt={m.awayTeam.Name} />
								<div className="game-content-title-text">
									<h2>{m.awayTeam.City}</h2>
									<h1>{m.awayTeam.Name}</h1>
									<p>{m.homeTeamRecord}</p>
								</div>
								<h2 style={m.awayScoreDisplay}>{m.awayScore}</h2>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="game-content-main">
							<div className="col-lg-6 game-content-main-home" style={homeStyle.backgroundColor}>
								
							</div>
							<div className="col-lg-6 game-content-main-away" style={awayStyle.backgroundColor}>
								
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default GetPlayersHome