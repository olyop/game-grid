import React from 'react'

class Game extends React.Component {
	
	constructor(props) {
		super(props)
		this.state = {
			toggleMenu: false,
			toggleStar: false
		}
		this.toggleMenu = this.toggleMenu.bind(this)
		this.toggleStar = this.toggleStar.bind(this)
	}
	
	toggleMenu() {
    this.setState(prevState => ({
      toggleMenu: !prevState.toggleMenu
    }));
  }
	
	toggleStar() {
		this.setState(prevState => ({
      toggleStar: !prevState.toggleStar
    }));
	}
	
	render() {
		
		let homeTeam, awayTeam, stadium, item, i, homeTeamStats,
				awayTeamStats, headerLeft,
				headerRight, gameBreak

		// Find Home Team
		for (i = 0; i < this.props.teams.length; i++) {
			item = this.props.teams[i]
			if (this.props.game.HomeTeamID === item.TeamID) {
				homeTeam = item
				break
			}
		}

		// Find Away Team
		for (i = 0; i < this.props.teams.length; i++) {
			item = this.props.teams[i]
			if (this.props.game.AwayTeamID === item.TeamID) {
				awayTeam = item
				break
			}
		}

		// Find Stadium
		for (i = 0; i < this.props.stadiums.length; i++) {
			item = this.props.stadiums[i]
			if (this.props.game.StadiumID === item.StadiumID) {
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
			item = this.props.teamStats[i]
			if (awayTeam.TeamID === item.TeamID) {
				awayTeamStats = item
				break
			}
		}

		const tieColor = { color: '#FF9800' },
					colorRed = { color: '#F44336' },
					colorGreen = { color: '#4CAF50' },
					displayBlock = { display: 'block' },
					displayNone = { display: 'none' },
					qtr = this.props.game.Quarter,
					timeSec = this.props.game.TimeRemainingSeconds,
					timeMin = this.props.game.TimeRemainingMinutes,
					homeScore = this.props.game.HomeTeamScore,
					awayScore = this.props.game.AwayTeamScore,
					time = this.props.game.DateTime,
					nbaWebsiteUrl = 'http://www.nba.com/',
					teamLogoUrl = 'http://i.cdn.turner.com/nba/nba/assets/logos/teams/primary/web/'

		let homeColor = { color: '#' + homeTeam.PrimaryColor },
				awayColor = { color: '#' + awayTeam.PrimaryColor },
				homeTeamRecord = homeTeamStats.Wins + ' - ' + homeTeamStats.Losses,
				awayTeamRecord = awayTeamStats.Wins + ' - ' + awayTeamStats.Losses,
				winningTeam, menuStyle, starType, starStyle,
				starInner, homeScoreStyle, awayScoreStyle

		// Check for Errors
		if (homeTeam.Name === 'Celtics') { homeColor = { color: '#2E7B3B' } }
		if (awayTeam.Name === 'Celtics') { awayColor = { color: '#2E7B3B' } }
		if (homeTeam.Name === 'Timberwolves') { homeColor = { color: '#005083' } }
		if (awayTeam.Name === 'Timberwolves') { awayColor = { color: '#005083' } }
		if (stadium.Name === 'Oracle Center') { stadium.Name = 'Oracle Arena' }
		if (homeTeam.Key === 'GS') { homeTeam.Key = 'GSW' }
		if (awayTeam.Key === 'GS') { awayTeam.Key = 'GSW' }
		if (homeTeam.Key === 'PHO') { homeTeam.Key = 'PHX' }
		if (awayTeam.Key === 'PHO') { awayTeam.Key = 'PHX' }
		if (homeTeam.Key === 'NY') { homeTeam.Key = 'NYK' }
		if (awayTeam.Key === 'NY') { awayTeam.Key = 'NYK' }
		if (homeTeam.Key === 'NO') { homeTeam.Key = 'NOP' }
		if (awayTeam.Key === 'NO') { awayTeam.Key = 'NOP' }
		if (homeTeam.Key === 'SA') { homeTeam.Key = 'SAS' }
		if (awayTeam.Key === 'SA') { awayTeam.Key = 'SAS' }
		
		if (!this.state.toggleMenu) { menuStyle = displayNone }
		if (this.state.toggleMenu) { menuStyle = displayBlock }
		if (this.state.toggleStar) {
			starType = 'star'
			starStyle = { display: 'block' }
			starInner = { borderColor: '#424242' }
		}
		if (!this.state.toggleStar) {
			starType = 'star_border'
			starStyle = null
			starInner = null
		}

		// Determine who is Winning
		if (homeScore === awayScore) {
			homeScoreStyle = tieColor
			awayScoreStyle = tieColor
		} else if (homeScore > awayScore) {
			winningTeam = homeTeam
			homeScoreStyle = colorGreen
			awayScoreStyle = colorRed
		} else if (awayScore > homeScore) {
			winningTeam = awayTeam
			awayScoreStyle = colorGreen
			homeScoreStyle = colorRed
		}

		// Determine if game has happened
		if (Number(homeScore) <= 0 && Number(awayScore) <= 0) {
			homeScoreStyle = { display: 'none' }
			awayScoreStyle = { display: 'none' }
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
		} else if (qtr === '1' || qtr === '2' ||  qtr ==='3' || qtr === '4') {
			let seconds
			if (timeSec < 10) { seconds = '0' + timeSec }
			else { seconds = timeSec }
			let str = timeMin + ':' + seconds
			headerRight = <b style={colorRed} className='blink'>{str}</b>
			headerLeft = <b style={colorRed}>{'Q' + qtr}</b>
			gameBreak = 'INP'
		}
		
		// Check if Spoilers are On
		if (this.props.spoiler === true) {
			homeScoreStyle = { display: 'none' }
			awayScoreStyle = { display: 'none' }
		}

		return (
			<div
				key={this.props.game.GameID}
				data-id={this.props.game.GameID}
				data-index={this.props.index}
				title={homeTeam.Name + ' vs ' + awayTeam.Name}
				className="game"
			>
				<div className="game-inner" style={starInner}>
					<div
						className="game-icon game-star"
						title="Star"
						onClick={this.toggleStar}
						style={starStyle}
					>
						<i className="material-icons">{starType}</i>
					</div>
					<div
						className="game-icon game-more"
						title="More"
						onClick={this.toggleMenu}
					>
						<i className="material-icons">more_vert</i>
					</div>
					<div className="game-more-menu" style={menuStyle}>
						<p
							className="close-menu"
							onClick={this.toggleMenu}
						>
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
						<p className="game-team-score" style={homeScoreStyle}>
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
						<p className="game-team-score" style={awayScoreStyle}>
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
		
	}
}

export default Game