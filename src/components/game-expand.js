import React from 'react'
import Request from 'react-http-request'
import Loading from './loading'
import GameStats from './game-stats'

import '../css/game-expand.css'

class GetPlayersHome extends React.Component {
	render() {
		
		let m = this.props.m
		
		return (
			<Request
				url={'https://api.fantasydata.net/v3/nba/stats/JSON/Players/' + m.home.info.Key}
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
									url={'https://api.fantasydata.net/v3/nba/stats/JSON/PlayerSeasonStatsByTeam/' + this.props.date.getFullYear() + '/' + m.home.info.Key}
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
				url={'https://api.fantasydata.net/v3/nba/stats/JSON/Players/' + m.away.info.Key}
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
									url={'https://api.fantasydata.net/v3/nba/stats/JSON/PlayerSeasonStatsByTeam/' + this.props.date.getFullYear() + '/' + m.away.info.Key}
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
				item, logourl = './media/team-logos/',
				i = 0, b = 0
		
		m.home.players = this.props.homeTeamPlayers
		m.away.players = this.props.awayTeamPlayers
		m.home.stats = this.props.homeTeamPlayerStats
		m.away.stats = this.props.awayTeamPlayerStats
		m.home.topPlayers = [
			{ info: null, stats: null },
			{ info: null, stats: null },
			{ info: null, stats: null }
		]
		m.away.topPlayers = [
			{ info: null, stats: null },
			{ info: null, stats: null },
			{ info: null, stats: null }
		]
		
		let homePlayersLength = m.home.players.length,
				awayPlayersLength = m.away.players.length
		
		if (m.home.info.Key === 'BKN') { m.home.color = '#2d2925' }
		if (m.home.info.Key === 'HOU') { m.home.color = '#c30e2e' }
		if (m.home.info.Key === 'SA') { m.home.color = '#0a1b23' }
		if (m.home.info.Key === 'MEM') { m.home.color = '#6089b8' }
		
		let homeStyle = {
			background: {
				backgroundColor: '#' + m.home.info.PrimaryColor,
				boxShadow: 'inset 0px 0px 200px 25px ' + this.hexToRgba(m.home.info.PrimaryColor, 0.60)
			},
			backgroundColor: { backgroundColor: '#' + m.home.info.PrimaryColor },
			backgroundImg: { backgroundImage: 'url(' + logourl + m.home.info.Key.toLowerCase() + '.svg)' }
		}
		let awayStyle = {
			background: {
				backgroundColor: '#' + m.away.info.PrimaryColor,
				boxShadow: 'inset 0px 0px 200px 25px ' + this.hexToRgba(m.away.info.PrimaryColor, 0.60)
			},
			backgroundColor: { backgroundColor: '#' + m.away.info.PrimaryColor },
			backgroundImg: { backgroundImage: 'url(' + logourl + m.away.info.Key.toLowerCase() + '.svg)' }
		}
				
		m.home.stats.sort((a, b) => b.Points - a.Points)
		m.away.stats.sort((a, b) => b.Points - a.Points)
		
		// Find Top 5 Home Players
		while (i < 3) {
			
			let homePlayerStats = m.home.stats[i],
					homePlayer
			
			// Find Player Stats
			for (var a = 0; a < homePlayersLength; a++) {
				item = m.home.players[a]
				if (homePlayerStats.PlayerID === item.PlayerID) {
					homePlayer = item
					break
				}
			}
			
			m.home.topPlayers[i].stats = homePlayerStats
			m.home.topPlayers[i].info = homePlayer
			
			i++
		}
		
		// Find Top 5 Away Players
		while (b < 3) {
			
			let awayPlayerStats = m.away.stats[b],
					awayPlayer
			
			// Find Player Stats
			for (var c = 0; c < awayPlayersLength; c++) {
				item = m.away.players[c]
				if (awayPlayerStats.PlayerID === item.PlayerID) {
					awayPlayer = item
					break
				}
			}
			
			m.away.topPlayers[b].stats = awayPlayerStats
			m.away.topPlayers[b].info = awayPlayer
			
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
								<a
									href={'http://www.nba.com/' + m.home.info.Name.toLowerCase()}
									target="_blank"
									title={m.home.info.Name}
								>
									<section style={homeStyle.backgroundImg}></section>
								</a>
								<div className="game-content-title-text">
									<h2>{m.home.info.City}</h2>
									<h1>{m.home.info.Name}</h1>
									<p>{m.home.record}</p>
								</div>
								<h2 style={m.home.scoreDisplay}>{m.home.score}</h2>
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
								<a
									href={'http://www.nba.com/' + m.away.info.Name.toLowerCase()}
									target="_blank"
									title={m.away.info.Name}
								>
									<section style={awayStyle.backgroundImg}></section>
								</a>
								<div className="game-content-title-text">
									<h2>{m.away.info.City}</h2>
									<h1>{m.away.info.Name}</h1>
									<p>{m.away.record}</p>
								</div>
								<h2 style={m.away.scoreDisplay}>{m.away.score}</h2>
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
					<div className="row game-content-info-border">
							
						<GameStats
							apiKey={this.props.apiKey}
							date={this.props.date}
							monthsYear={this.props.monthsYear}
							daysWeek={this.props.daysWeek}
							findDateString={this.props.findDateString}
							m={m} />
						
					</div>
				</div>
			</div>
		)
	}
}

export default GetPlayersHome