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
		
		let item, i
		
		let m =  {
			homeTeam: null,
			homeColor: null,
			homeTeamStats: null,
			homeTeamRecord: null,
			awayTeam: null,
			awayColor: null,
			awayTeamStats: null,
			awayTeamRecord: null,
			stadium: null,
			headerLeft: null,
			headerRight: null,
			gameBreak: null,
			teamsLength: this.props.teams.length,
			stadiumsLength: this.props.stadiums.length,
			teamStatsLength: this.props.teamStats.length,
			tieColor: { color: '#FF9800' },
			colorRed: { color: '#F44336' },
			colorGreen: { color: '#4CAF50' },
			displayBlock: { display: 'block' },
			displayNone: { display: 'none' },
			qtr: this.props.game.Quarter,
			timeSec: this.props.game.TimeRemainingSeconds,
			timeMin: this.props.game.TimeRemainingMinutes,
			homeScore: this.props.game.HomeTeamScore,
			awayScore: this.props.game.AwayTeamScore,
			time: this.props.game.DateTime,
			toggleScores: this.props.toggleScores,
			nbaWebsiteUrl: 'http://www.nba.com/',
			teamLogoUrl: './media/team-logos/',
			winningTeam: null,
			menuStyle: null,
			starType: null,
			starStyle: null,
			shareStyle: null,
			starInner: null,
			homeScoreStyle: null,
			awayScoreStyle: null,
			homeScoreDisplay: null,
			awayScoreDisplay: null,
			gameClass: null,
			sliceTimeMin: null,
			sliceTimeSec: null,
			winningText: null
		}

		// Find Home Team
		for (i = 0; i < m.teamsLength; i++) {
			item = this.props.teams[i]
			if (this.props.game.HomeTeamID === item.TeamID) {
				m.homeTeam = item
				break
			}
		}
		
		// Find Away Team
		for (i = 0; i < m.teamsLength; i++) {
			item = this.props.teams[i]
			if (this.props.game.AwayTeamID === item.TeamID) {
				m.awayTeam = item
				break
			}
		}
		
		// Find Stadium
		for (i = 0; i < m.stadiumsLength; i++) {
			item = this.props.stadiums[i]
			if (this.props.game.StadiumID === item.StadiumID) {
				m.stadium = item
				break
			}
		}
		
		// Find Home Team Stats
		for (i = 0; i < m.teamStatsLength; i++) {
			item = this.props.teamStats[i]
			if (m.homeTeam.TeamID === item.TeamID) {
				m.homeTeamStats = item
				break
			}
		}
		
		// Find Away Team Stats
		for (i = 0; i < m.teamStatsLength; i++) {
			item = this.props.teamStats[i]
			if (m.awayTeam.TeamID === item.TeamID) {
				m.awayTeamStats = item
				break
			}
		}
		
		// Declare after ID Matches
		m.homeColor = { color: '#' + m.homeTeam.PrimaryColor }
		m.awayColor = { color: '#' + m.awayTeam.PrimaryColor }
		m.homeTeamRecord = m.homeTeamStats.Wins + ' - ' + m.homeTeamStats.Losses
		m.awayTeamRecord = m.awayTeamStats.Wins + ' - ' + m.awayTeamStats.Losses
		m.sliceTimeMin = m.time.slice(11,13)
		m.sliceTimeSec = m.time.slice(14,16)
		m.winningText = name => <b><span style={m.colorGreen}>{name}</span></b>;

		// Check for Errors
		if (m.homeTeam.Name === 'Celtics') { m.homeColor = { color: '#2E7B3B' } }
		if (m.awayTeam.Name === 'Celtics') { m.awayColor = { color: '#2E7B3B' } }
		if (m.homeTeam.Name === 'Timberwolves') { m.homeColor = { color: '#005083' } }
		if (m.awayTeam.Name === 'Timberwolves') { m.awayColor = { color: '#005083' } }
		if (m.stadium.Name === 'Oracle Center') { m.stadium.Name = 'Oracle Arena' }
		
		// Toggle
		if (this.state.toggleStar) {
			m.starType = 'star'
			m.starStyle = { display: 'block' }
			m.starInner = { borderColor: '#212121' }
		}
		else {
			m.starType = 'star_border'
			m.starStyle = null
			m.starInner = null
		}
		
		if (this.state.toggleExpand) { m.gameClass = 'game active' }
		else { m.gameClass = 'game' }

		
		if (!this.state.toggleMenu) { m.menuStyle = m.displayNone }
		if (this.state.toggleMenu) { m.menuStyle = m.displayBlock }
		
		if (!this.state.toggleShare) { m.shareStyle = m.displayNone }
		if (this.state.toggleShare) { m.shareStyle = m.displayBlock }
		
		
		// Determine who is Winning
		if (m.homeScore === m.awayScore) {
			m.homeScoreStyle = m.tieColor
			m.awayScoreStyle = m.tieColor
		} else if (m.homeScore > m.awayScore) {
			m.winningTeam = m.homeTeam
			m.homeScoreStyle = m.colorGreen
			m.awayScoreStyle = m.colorRed
		} else if (m.awayScore > m.homeScore) {
			m.winningTeam = m.awayTeam
			m.awayScoreStyle = m.colorGreen
			m.homeScoreStyle = m.colorRed
		}

		// Determine if game has happened
		if (m.homeScore <= 0 && m.awayScore <= 0) {
			m.homeScoreDisplay = { display: 'none' }
			m.awayScoreDisplay = { display: 'none' }
		}

		// Determine Game Status
		if (m.qtr === null && m.timeMin === null && m.timeSec === null && m.homeScore === null) {
			if (m.sliceTimeMin <= 12) {
				m.headerRight = m.sliceTimeMin + ':' + m.sliceTimeSec + ' PM / ET'
			} else {
				m.headerRight = (m.sliceTimeMin - 12) + ':' + m.sliceTimeSec + ' PM / ET'
			}
			m.headerLeft = m.stadium.Name
			m.gameBreak = 'AT'
		} else if (m.qtr === 'F/OT') {
			m.headerLeft = <b>Overtime</b>
			if (m.toggleScores) { m.headerRight = m.stadium.Name }
			else { m.headerRight = m.winningText(m.winningTeam.Name) }
			m.gameBreak = 'FINAL'
		}	else if (m.qtr === 'Half') {
			m.headerRight = <b>Half Time</b>
			m.headerLeft = m.stadium.Name
			m.gameBreak = 'AT' 
		} else if ((m.qtr === null && m.timeSec === null && m.timeMin === null && m.homeScore > 0) || m.qtr === 'F') {
			m.headerLeft = <b>Full Time</b>
			if (this.props.toggleScores) { m.headerRight = m.stadium.Name }
			else { m.headerRight = m.winningText(m.winningTeam.Name) }
			m.gameBreak = 'FINAL'
		} else if (m.qtr === '1' || m.qtr === '2' || m.qtr === '3' || m.qtr === '4') {
			let seconds
			if (m.timeSec < 10) { seconds = '0' + m.timeSec }
			else { seconds = m.timeSec }
			let str = m.timeMin + ':' + seconds
			if (m.toggleScores) {
				m.headerLeft = m.stadium.Name
				if (m.sliceTimeMin <= 12) {
					m.headerRight = m.sliceTimeMin + ':' + m.sliceTimeSec + ' PM / ET'
				} else {
					m.headerRight = (m.sliceTimeMin - 12) + ':' + m.sliceTimeSec + ' PM / ET'
				}
			} else {
				m.headerRight = <b style={m.colorRed} className='blink'>{str}</b>
				m.headerLeft = <b style={m.colorRed}>{'Q' + m.qtr}</b>
			}
			m.gameBreak = 'INP'
		}
		
		// Check if Spoilers are On
		if (m.toggleScores) {
			m.homeScoreDisplay = { display: 'none' }
			m.awayScoreDisplay = { display: 'none' }
		}

		return (
			<div
				key={this.props.game.GameID}
				data-id={this.props.game.GameID}
				data-index={this.props.index}
				title={m.homeTeam.Name + ' vs ' + m.awayTeam.Name}
				className={m.gameClass}
			>
				
				{
					this.state.toggleExpand ?
						null :
						<GameInfo
							apiKey={this.props.apiKey}
							m={m}
							date={this.props.date}
							toggleMenu={this.toggleMenu}
							toggleStar={this.toggleStar}
							toggleShare={this.toggleShare}
							toggleExpand={this.toggleExpand}
						/>
				}
				
				{
					this.state.toggleExpand ?
						<GameExpand
							apiKey={this.props.apiKey}
							m={m}
							date={this.props.date}
							toggleExpand={this.toggleExpand}
						/> :
						null
				}
				
			</div>
		)
		
	}
}

class GameInfo extends React.Component {
	render() {
		
		let m = this.props.m
		
		return (
			<div className="game-inner" style={m.starInner}>
				<div
					className="game-icon game-star"
					title="Star"
					onClick={this.props.toggleStar}
					style={m.starStyle}
				>
					<i className="material-icons">{m.starType}</i>
				</div>
				<div
					className="game-icon game-more"
					title="More"
					onClick={this.props.toggleMenu}
				>
					<i className="material-icons">more_vert</i>
				</div>
				<div className="game-more-menu more-menu" style={m.menuStyle}>
					<p
						className="close-menu"
						onClick={this.props.toggleMenu}
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
					<p onClick={this.props.toggleStar}>
						<i className="material-icons">{m.starType}</i>
						<span>Star</span>
					</p>
					<hr />
					<p>
						<a
							href={m.nbaWebsiteUrl + m.homeTeam.Name.toLowerCase() + '/'}
							title={'Visit the ' + m.homeTeam.Name + ' website'}
							target="_blank"
						>
							<i className="material-icons">open_in_new</i>
							<span>{m.homeTeam.Name + '.com'}</span>
						</a>
					</p>
					<p>
						<a
							href={m.nbaWebsiteUrl + m.awayTeam.Name.toLowerCase() + '/'}
							title={'Visit the ' + m.awayTeam.Name + ' website'}
							target="_blank"
						>
							<i className="material-icons">open_in_new</i>
							<span>{m.awayTeam.Name + '.com'}</span>
						</a>
					</p>
				</div>
				<div
					className="game-icon game-share"
					title="Share"
					onClick={this.props.toggleShare}
				>
					<i className="material-icons">share</i>
				</div>
				<div className="game-share-menu more-menu" style={m.shareStyle}>
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
						onClick={this.props.toggleShare}
					>
						<i className="material-icons">close</i>
						<span>Close</span>
					</p>
				</div>
				<div
					className="game-icon game-expand"
					title="Expand"
					onClick={this.props.toggleExpand}
				>
					<i className="material-icons">expand_more</i>
				</div>
				<div className="game-team">
					<img
						src={m.teamLogoUrl + m.homeTeam.Key.toLowerCase() + '.svg'}
						alt={m.homeTeam.Name} 
					/>
					<p className="game-team-score" style={m.homeScoreDisplay}>
						<span style={m.homeScoreStyle}>{m.homeScore}</span>
					</p>
					<div className="game-team-text">
						<h4>{m.homeTeam.City}</h4>
						<h3 style={m.homeColor}>{m.homeTeam.Name}</h3>
						<p>{m.homeTeamRecord}</p>
					</div>
				</div>
				<div className="game-break">
					<hr />
					<p>VS</p>
					<hr />
				</div>
				<div className="game-team">
					<img
						src={m.teamLogoUrl + m.awayTeam.Key.toLowerCase() + '.svg'}
						alt={m.awayTeam.Name} 
					/>
					<p className="game-team-score" style={m.awayScoreDisplay}>
						<span style={m.awayScoreStyle}>{m.awayScore}</span>
					</p>
					<div className="game-team-text">
						<h4>{m.awayTeam.City}</h4>
						<h3 style={m.awayColor}>{m.awayTeam.Name}</h3>
						<p>{m.awayTeamRecord}</p>
					</div>
				</div>
				<div className="game-break">
					<hr />
					<p>{m.gameBreak}</p>
					<hr />
				</div>
				<div className="game-header">
					<p>
						{m.headerLeft}
						{' '}&#8212;{' '}
						{m.headerRight}
					</p>
				</div>
			</div>
		)
	}
}

export default Game