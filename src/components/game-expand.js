import React from 'react'
import Request from 'react-http-request'
import Loading from './loading'
import GameContentStats from './game-stats'

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
														monthsYear={this.props.monthsYear}
														daysWeek={this.props.daysWeek}
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
														monthsYear={this.props.monthsYear}
														daysWeek={this.props.daysWeek}
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
		
		let m = this.props.m,
				i = 0, b = 0,
				item, logourl = './media/team-logos/'
		
		m.homePlayers = this.props.homeTeamPlayers
		m.awayPlayers = this.props.awayTeamPlayers
		m.homeStats = this.props.homeTeamPlayerStats
		m.awayStats = this.props.awayTeamPlayerStats
		m.homeTopPlayers = [
			{ info: null, stats: null },
			{ info: null, stats: null },
			{ info: null, stats: null }
		]
		m.awayTopPlayers = [
			{ info: null, stats: null },
			{ info: null, stats: null },
			{ info: null, stats: null }
		]
		
		let homePlayersLength = m.homePlayers.length,
				awayPlayersLength = m.awayPlayers.length
		
		if (m.homeTeam.Key === 'BKN') { m.homeColor.color = '#2d2925' }
		if (m.homeTeam.Key === 'HOU') { m.homeColor.color = '#c30e2e' }
		if (m.homeTeam.Key === 'SA') { m.homeColor.color = '#0a1b23' }
		if (m.homeTeam.Key === 'MEM') { m.homeColor.color = '#6089b8' }
		
		let homeStyle = {
			background: {
				backgroundColor: m.homeColor.color,
				boxShadow: 'inset 0px 0px 200px 25px ' + this.hexToRgba(m.homeColor.color, 0.60)
			},
			backgroundColor: {
				backgroundColor: m.homeColor.color
			},
			backgroundImg: {
				backgroundImage: 'url(' + logourl + m.homeTeam.Key + '.svg)'
			}
		}
		let awayStyle = {
			background: {
				backgroundColor: m.awayColor.color,
				boxShadow: 'inset 0px 0px 200px 25px ' + this.hexToRgba(m.awayColor.color, 0.60)
			},
			backgroundColor: {
				backgroundColor: m.awayColor.color
			},
			backgroundImg: {
				backgroundImage: 'url(' + logourl + m.awayTeam.Key + '.svg)'
			}
		}
				
		m.homeStats.sort((a, b) => b.Points - a.Points)
		m.awayStats.sort((a, b) => b.Points - a.Points)
		
		// Find Top 5 Home Players
		while (i < 3) {
			
			let homePlayerStats = m.homeStats[i],
					homePlayer
			
			// Find Player Stats
			for (var a = 0; a < homePlayersLength; a++) {
				item = m.homePlayers[a]
				if (homePlayerStats.PlayerID === item.PlayerID) {
					homePlayer = item
					break
				}
			}
			
			m.homeTopPlayers[i].stats = homePlayerStats
			m.homeTopPlayers[i].info = homePlayer
			
			i++
		}
		
		// Find Top 5 Away Players
		while (b < 3) {
			
			let awayPlayerStats = m.awayStats[b],
					awayPlayer
			
			// Find Player Stats
			for (var c = 0; c < awayPlayersLength; c++) {
				item = m.awayPlayers[c]
				if (awayPlayerStats.PlayerID === item.PlayerID) {
					awayPlayer = item
					break
				}
			}
			
			m.awayTopPlayers[b].stats = awayPlayerStats
			m.awayTopPlayers[b].info = awayPlayer
			
			b++
		}
		
		return (
			<div className="game-content">
				<div className="container-fluid game-content-inner">
					<div className="row">
						<div
							className="col-md-6 game-content-team game-content-left"
							style={homeStyle.background}
						>
							<div className="game-content-title">
								<section style={homeStyle.backgroundImg}></section>
								<div className="game-content-title-text">
									<h2>{m.homeTeam.City}</h2>
									<h1>{m.homeTeam.Name}</h1>
									<p style={m.homeScoreDisplay}>{m.homeTeamRecord}</p>
								</div>
								<h2 style={m.homeScoreDisplay}>{m.homeScore}</h2>
							</div>
						</div>
						<div className="game-content-close" onClick={this.props.toggleExpand}>
							<i className="material-icons">expand_less</i>
						</div>
						<div className="game-content-vs">
							<p>VS</p>
						</div>
						<div
							className="col-md-6 game-content-team game-content-right"
							style={awayStyle.background}
						>
							<div className="game-content-title">
								<section style={awayStyle.backgroundImg}></section>
								<div className="game-content-title-text">
									<h2>{m.awayTeam.City}</h2>
									<h1>{m.awayTeam.Name}</h1>
									<p style={m.homeScoreDisplay} >{m.awayTeamRecord}</p>
								</div>
								<h2 style={m.awayScoreDisplay}>{m.awayScore}</h2>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="game-content-info">
							<p>Home</p>
							<p>{m.headerLeft} &#8211; {m.headerRight}</p>
							<p>Away</p>
						</div>
					</div>
					<div className="row">
							
						<GameContentStats
							apiKey={this.props.apiKey}
							date={this.props.date}
							monthsYear={this.props.monthsYear}
							daysWeek={this.props.daysWeek}
							m={m} />
						
					</div>
				</div>
			</div>
		)
	}
}

export default GetPlayersHome