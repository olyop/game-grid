import React from 'react'
import GameExpand from './game-expand'
import '../css/more-menu.css'

class Game extends React.Component {
	
	constructor(props) {
		super(props)
		this.state = {
			toggleMenu: false,
			toggleStar: false,
			toggleShare: false,
			toggleExpand: false
		}
		this.toggleMenu = this.toggleMenu.bind(this)
		this.toggleStar = this.toggleStar.bind(this)
		this.toggleShare = this.toggleShare.bind(this)
		this.toggleExpand = this.toggleExpand.bind(this)
	}
	
	toggleMenu() {
    this.setState(prevState => ({ toggleMenu: !prevState.toggleMenu }))
  }
	
	toggleStar() {
		this.setState(prevState => ({ toggleStar: !prevState.toggleStar }))
	}
	
	toggleShare() {
		this.setState(prevState => ({ toggleShare: !prevState.toggleShare }))
	}
	
	toggleExpand() {
		this.setState(prevState => ({ toggleExpand: !prevState.toggleExpand }))
	}
	
	render() {
		
		let homeTeam, awayTeam, stadium, item, i, homeTeamStats,
				awayTeamStats, headerLeft, headerRight, gameBreak,
				teamsLength = this.props.teams.length,
				stadiumsLength = this.props.stadiums.length,
				teamStatsLength = this.props.teamStats.length

		// Match and Find Data
		for (i = 0; i < teamsLength; i++) {
			item = this.props.teams[i]
			if (this.props.game.HomeTeamID === item.TeamID) {
				homeTeam = item
				break
			}
		}
		for (i = 0; i < teamsLength; i++) {
			item = this.props.teams[i]
			if (this.props.game.AwayTeamID === item.TeamID) {
				awayTeam = item
				break
			}
		}
		for (i = 0; i < stadiumsLength; i++) {
			item = this.props.stadiums[i]
			if (this.props.game.StadiumID === item.StadiumID) {
				stadium = item
				break
			}
		}
		for (i = 0; i < teamStatsLength; i++) {
			item = this.props.teamStats[i]
			if (homeTeam.TeamID === item.TeamID) {
				homeTeamStats = item
				break
			}
		}
		for (i = 0; i < teamStatsLength; i++) {
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
					toggleScores = this.props.toggleScores,
					nbaWebsiteUrl = 'http://www.nba.com/',
					teamLogoUrl = './media/team-logos/'
		
		let homeColor = { color: '#' + homeTeam.PrimaryColor },
				awayColor = { color: '#' + awayTeam.PrimaryColor },
				homeTeamRecord = homeTeamStats.Wins + ' - ' + homeTeamStats.Losses,
				awayTeamRecord = awayTeamStats.Wins + ' - ' + awayTeamStats.Losses,
				winningTeam, menuStyle, starType, starStyle, shareStyle,
				starInner, homeScoreStyle, awayScoreStyle,
				homeScoreDisplay, awayScoreDisplay, gameClass,
				sliceTimeMin = time.slice(11,13),
				sliceTimeSec = time.slice(14,16),
				winningText = name => <b><span style={colorGreen}>{name}</span></b>

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
		
		console.log(homeTeam.PrimaryColor, awayTeam.PrimaryColor)
		
		// Toggle
		if (this.state.toggleStar) {
			starType = 'star'
			starStyle = { display: 'block' }
			starInner = { borderColor: '#212121' }
		}
		else {
			starType = 'star_border'
			starStyle = null
			starInner = null
		}
		
		if (this.state.toggleExpand) { gameClass = 'game active' }
		else { gameClass = 'game' }

		
		if (!this.state.toggleMenu) { menuStyle = displayNone }
		if (this.state.toggleMenu) { menuStyle = displayBlock }
		
		if (!this.state.toggleShare) { shareStyle = displayNone }
		if (this.state.toggleShare) { shareStyle = displayBlock }
		
		
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
			homeScoreDisplay = { display: 'none' }
			awayScoreDisplay = { display: 'none' }
		}

		// Determine Game Status
		if (qtr === null && timeMin === null && timeSec === null && homeScore === null) {
			if (sliceTimeMin <= 12) {
				headerRight = sliceTimeMin + ':' + sliceTimeSec + ' PM / ET'
			} else {
				headerRight = (sliceTimeMin - 12) + ':' + sliceTimeSec + ' PM / ET'
			}
			headerLeft = stadium.Name
			gameBreak = 'AT'
		} else if (qtr === 'F/OT') {
			headerLeft = <b>Overtime</b>
			if (toggleScores) { headerRight = stadium.Name }
			else { headerRight = winningText(winningTeam.Name) }
			gameBreak = 'FINAL'
		}	else if (qtr === 'Half') {
			headerRight = <b>Half Time</b>
			headerLeft = stadium.Name
			gameBreak = 'AT' 
		} else if ((qtr === null && timeSec === null && timeMin === null && homeScore > 0) || qtr === 'F') {
			headerLeft = <b>Full Time</b>
			if (this.props.toggleScores) { headerRight = stadium.Name }
			else { headerRight = winningText(winningTeam.Name) }
			gameBreak = 'FINAL'
		} else if (qtr === '1' || qtr === '2' ||  qtr === '3' || qtr === '4') {
			let seconds
			if (timeSec < 10) { seconds = '0' + timeSec }
			else { seconds = timeSec }
			let str = timeMin + ':' + seconds
			if (toggleScores) {
				headerLeft = stadium.Name
				if (sliceTimeMin <= 12) {
					headerRight = sliceTimeMin + ':' + sliceTimeSec + ' PM / ET'
				} else {
					headerRight = (sliceTimeMin - 12) + ':' + sliceTimeSec + ' PM / ET'
				}
			} else {
				headerRight = <b style={colorRed} className='blink'>{str}</b>
				headerLeft = <b style={colorRed}>{'Q' + qtr}</b>
			}
			gameBreak = 'INP'
		}
		
		// Check if Spoilers are On
		if (toggleScores) {
			homeScoreDisplay = { display: 'none' }
			awayScoreDisplay = { display: 'none' }
		}

		return (
			<div
				key={this.props.game.GameID}
				data-id={this.props.game.GameID}
				data-index={this.props.index}
				title={homeTeam.Name + ' vs ' + awayTeam.Name}
				className={gameClass}
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
					<div className="game-more-menu more-menu" style={menuStyle}>
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
							<a
								href="https://github.com/olyop/game-grid/issues/"
								target="_blank"
							>
								<i className="material-icons">bug_report</i>
								<span>Report Bug</span>
							</a>
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
							<a
								href="https://github.com/olyop/game-grid/"
								target="_blank"
							>
								<i className="material-icons">help</i>
								<span>Help</span>
							</a>
						</p>
						<p onClick={this.toggleStar}>
							<i className="material-icons">{starType}</i>
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
					<div
						className="game-icon game-share"
						title="Share"
						onClick={this.toggleShare}
					>
						<i className="material-icons">share</i>
					</div>
					<div className="game-share-menu more-menu" style={shareStyle}>
						<p>
							<img src="./media/instagram.png" alt='Instagram logo' />
							<span>Instagram</span>
						</p>
						<p>
							<img src="./media/facebook.png" alt='Facebook logo' />
							<span>Facebook</span>
						</p>
						<p>
							<img src="./media/twitter.png" alt='Twitter logo' />
							<span>Twitter</span>
						</p>
						<p>
							<img src="./media/reddit.png" alt='Reddit logo' />
							<span>Reddit</span>
						</p>
						<hr />
						<p
							className="close-menu"
							onClick={this.toggleShare}
						>
							<i className="material-icons">close</i>
							<span>Close</span>
						</p>
					</div>
					<div
						className="game-icon game-expand"
						title="Expand"
						onClick={this.toggleExpand}
					>
						<i className="material-icons">expand_more</i>
					</div>
					<div className="game-team">
						<img
							src={teamLogoUrl + homeTeam.Key.toLowerCase() + '.svg'}
							alt={homeTeam.Name} 
						/>
						<p className="game-team-score" style={homeScoreDisplay}>
							<span style={homeScoreStyle}>{homeScore}</span>
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
						<p className="game-team-score" style={awayScoreDisplay}>
							<span style={awayScoreStyle}>{awayScore}</span>
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
				
				{
					this.state.toggleExpand ?
						<GameExpand
							game={this.props.game}
							stadium={stadium}
							homeTeam={homeTeam}
							awayTeam={awayTeam}
							homeTeamStats={homeTeamStats}
							awayTeamStats={awayTeamStats}
							homeTeamRecord={homeTeamRecord}
							awayTeamRecord={awayTeamRecord}
							headerLeft={headerLeft}
							headerRight={headerRight}
							gameBreak={gameBreak}
							winningTeam={winningTeam}
						/> :
						null
				}
				
			</div>
		)
		
	}
}

export default Game