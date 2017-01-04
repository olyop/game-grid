import React from 'react'
import Request from 'react-http-request'
import Loading from './loading.js'
import '../css/game-grid.css'
import GamesInfo from './games-info.js'

class GameGrid extends React.Component {
	
	render() {
		return (
			<Request
				url={'https://api.fantasydata.net/v3/nba/scores/json/GamesByDate/' + this.findDateString(this.props.date)}
				headers={this.props.apiKey}
			>
				{
					({error, result, loading}) => {
						if (loading) {
							console.log(loading)
							return (
								<Loading />
							)
						} else {
							console.log(loading)
							return (
								<GameGridInner
									teamStats={this.props.teamStats}
									stadiums={this.props.stadiums}
									games={result.body}
									teams={this.props.teams}
								/>
							)
						}
					}
				}
			</Request>
		)
	}
	
	findDateString(date) {
		let months = this.props.monthsYear,
				nowYear = String(date.getFullYear()),
				nowMonth = String(months[date.getMonth()].abbr),
				nowDate = String(date.getDate() - 1) // -1 for American Time Zone Diff				
		
		return nowYear + '-' + nowMonth + '-' + nowDate
	}
	
}

class GameGridInner extends React.Component {
	
	componentWillMount() {
		// DEV: Log API
		console.log({teams: this.props.teams})
		console.log({teamStats: this.props.teamStats})
		console.log({staidums: this.props.stadiums})
	}
	
	render() {
		
		// DEV: Log API
		console.log({games: this.props.games})
		
		let gamesList = this.props.games.map((game, index) => {

			let homeTeam, awayTeam, stadium, item, i, homeTeamStats,
					awayTeamStats, homeScoreColorStyle, awayScoreColorStyle, headerLeft,
					headerRight, gameBreak

			// Find Home Team
			for (i = 0; i < this.props.teams.length; i++) {
				item = this.props.teams[i]
				if (game.HomeTeamID === item.TeamID) {
					homeTeam = item
					break
				}
			}

			// Find Away Team
			for (i = 0; i < this.props.teams.length; i++) {
				item = this.props.teams[i]
				if (game.AwayTeamID === item.TeamID) {
					awayTeam = item
					break
				}
			}

			// Find Stadium
			for (i = 0; i < this.props.stadiums.length; i++) {
				item = this.props.stadiums[i]
				if (game.StadiumID === item.StadiumID) {
					stadium = item
					break
				}
			}

			// Find Home Team Stats
			for (i = 0; i < this.props.teamStats.length; i++) {
				item = this.props.teamStats[i]
				if (homeTeam.TeamID === item.TeamID) {
					homeTeamStats = item
					break
				}
			}

			// Find Away Team Stats
			for (i = 0; i < this.props.teamStats.length; i++) {
				item =this.props.teamStats[i]
				if (awayTeam.TeamID === item.TeamID) {
					awayTeamStats = item
					break
				}
			}
			
			const tieColor = { color: '#FF9800' },
						colorRed = { color: '#F44336' },
						colorGreen = { color: '#4CAF50' },
						qtr = game.Quarter,
						timeSec = game.TimeRemainingSeconds,
						timeMin = game.TimeRemainingMinutes,
						homeScore = game.HomeTeamScore,
						awayScore = game.AwayTeamScore,
						time = game.DateTime,
						nbaWebsiteUrl = 'http://www.nba.com/',
						teamLogoUrl = 'http://i.cdn.turner.com/nba/nba/assets/logos/teams/primary/web/'
			
			let homeColor = { color: '#' + homeTeam.PrimaryColor },
					awayColor = { color: '#' + awayTeam.PrimaryColor },
					homeTeamRecord = homeTeamStats.Wins + ' - ' + homeTeamStats.Losses,
					awayTeamRecord = awayTeamStats.Wins + ' - ' + awayTeamStats.Losses,
					winningTeam
			
			// Check for Boston Colors
			if (homeTeam.Name === 'Celtics') { homeColor = { color: '#2E7B3B' } }
			if (awayTeam.Name === 'Celtics') { awayColor = { color: '#2E7B3B' } }
			
			// Check for Timberwolves Colors
			if (homeTeam.Name === 'Timberwolves') { homeColor = { color: '#005083' } }
			if (awayTeam.Name === 'Timberwolves') { awayColor = { color: '#005083' } }
			
			// Check for Oracle Arena
			if (stadium.Name === 'Oracle Center') { stadium.Name = 'Oracle Arena' }
			
			// Determine who is Winning
			if (homeScore === awayScore) {
				homeScoreColorStyle = tieColor
				awayScoreColorStyle = tieColor
			} else if (homeScore > awayScore) {
				winningTeam = homeTeam
				homeScoreColorStyle = colorGreen
				awayScoreColorStyle = colorRed
			} else if (awayScore > homeScore) {
				winningTeam = awayTeam
				awayScoreColorStyle = colorGreen
				homeScoreColorStyle = colorRed
			}

			// Determine if game has happened
			if (Number(game.HomeTeamScore) <= 0 && Number(game.AwayTeamScore) <= 0) {
				homeScoreColorStyle = { display: 'none' }
				awayScoreColorStyle = { display: 'none' }
			}
			
			var winningText = name => <b><span style={colorGreen}>{name}</span></b>

			// Determine Game Status
			if (qtr === null && timeMin === null && timeSec === null && homeScore === null && awayScore === null) {
				if (time.slice(11,13) <= 12) {
					headerRight = time.slice(11,13) + ':' + time.slice(14,16) + ' PM / ET'
				} else {
					headerRight = (time.slice(11,13) - 12) + ':' + time.slice(14,16) + ' PM / ET'
				}
				headerLeft = stadium.Name
				gameBreak = 'AT'
			} else if (qtr === 'F/OT') {
				headerLeft = <b>Overtime</b>
				headerRight = winningText(winningTeam.Name)
				gameBreak = 'FINAL'
				homeTeamRecord = ''
				awayTeamRecord = ''
			}	else if (qtr === 'Half') {
				headerRight = <b>Half Time</b>
				headerLeft = stadium.Name
				gameBreak = 'AT' 
			} else if ((qtr === null && timeSec === null && timeMin === null && awayScore > 0 && homeScore > 0) || qtr === 'F') {
				headerLeft = <b>Full Time</b>
				headerRight = winningText(winningTeam.Name)
				gameBreak = 'FINAL'
				homeTeamRecord = ''
				awayTeamRecord = ''
			} else if (qtr === '1' || '2' || '3' || '4') {
				let seconds
				if (timeSec < 10) { seconds = '0' + timeSec }
				else { seconds = timeSec }
				let str = timeMin + ':' + seconds
				headerRight = <b style={colorRed} className='blink'>{str}</b>
				headerLeft = <b style={colorRed}>{'Q' + qtr}</b>
				gameBreak = 'INP'
			}

			return (
				<div
					key={game.GameID}
					data-id={game.GameID}
					data-index={index}
					title={homeTeam.Name + ' vs ' + awayTeam.Name}
					className="game"
				>
					<div className="game-inner">
						<div className="game-icon game-star" title="Star">
							<i className="material-icons">star_border</i>
						</div>
						<div className="game-more-menu">
							<p className="close-menu">
								<i className="material-icons">close</i>
								<span>Close</span>
							</p>
							<hr />
							<p>
								<i className="material-icons">watch_later</i>
								<span>Watch Later</span>
							</p>
							<p>
								<i className="material-icons">bug_report</i>
								<span>Report Bug</span>
							</p>
							<p>
								<i className="material-icons">visibility</i>
								<span>Visibility</span>
							</p>
							<p>
								<i className="material-icons">settings</i>
								<span>Settings</span>
							</p>
							<p>
								<i className="material-icons">help</i>
								<span>Help</span>
							</p>
							<p>
								<i className="material-icons">star</i>
								<span>Star</span>
							</p>
							<hr />
							<p>
								<a
									href={nbaWebsiteUrl + homeTeam.Name.toLowerCase() + '/'}
									title={'Visit the ' + homeTeam.Name + ' website'}
									target="_blank"
								>
									<i className="material-icons">open_in_new</i>
									<span>{homeTeam.Name + '.com'}</span>
								</a>
							</p>
							<p>
								<a
									href={nbaWebsiteUrl + awayTeam.Name.toLowerCase() + '/'}
									title={'Visit the ' + awayTeam.Name + ' website'}
									target="_blank"
								>
									<i className="material-icons">open_in_new</i>
									<span>{awayTeam.Name + '.com'}</span>
								</a>
							</p>
						</div>
						<div className="game-icon game-more" title="More">
							<i className="material-icons">more_vert</i>
						</div>
						<div className="game-icon game-share" title="Share">
							<i className="material-icons">share</i>
						</div>
						<div className="game-icon game-expand" title="Expand">
							<i className="material-icons">expand_more</i>
						</div>
						<div className="game-team">
							<img
								src={teamLogoUrl + homeTeam.Key.toLowerCase() + '.svg'}
								alt={homeTeam.Name} 
							/>
							<p className="game-team-score" style={homeScoreColorStyle}>
								<span>{homeScore}</span>
							</p>
							<div className="game-team-text">
								<h4>{homeTeam.City}</h4>
								<h3 style={homeColor}>{homeTeam.Name}</h3>
								<p>{homeTeamRecord}</p>
							</div>
						</div>
						<div className="game-break">
							<hr />
							<p>VS</p>
							<hr />
						</div>
						<div className="game-team">
							<img
								src={teamLogoUrl + awayTeam.Key.toLowerCase() + '.svg'}
								alt={awayTeam.Name} 
							/>
							<p className="game-team-score" style={awayScoreColorStyle}>
								<span>{awayScore}</span>
							</p>
							<div className="game-team-text">
								<h4>{awayTeam.City}</h4>
								<h3 style={awayColor}>{awayTeam.Name}</h3>
								<p>{awayTeamRecord}</p>
							</div>
						</div>
						<div className="game-break">
							<hr />
							<p>{gameBreak}</p>
							<hr />
						</div>
						<div className="game-header">
							<p>
								{headerLeft}
								{' '}&#8212;{' '}
								{headerRight}
							</p>
						</div>
					</div>
				</div>
			)
		})
		return (
			<div>
				
				<GamesInfo
					games={this.props.games}
				/>
				
				<div id="game-grid">
					{gamesList}
				</div>
				
			</div>
		)
	}
}

export default GameGrid