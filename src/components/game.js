import React from 'react'
import GameInfo from './game-info'
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
	
	// Toggle Functions
	toggleMenu() { this.setState(prevState => ({ toggleMenu: !prevState.toggleMenu })) }
	toggleStar() { this.setState(prevState => ({ toggleStar: !prevState.toggleStar })) }
	toggleShare() { this.setState(prevState => ({ toggleShare: !prevState.toggleShare })) }
	toggleExpand() { this.setState(prevState => ({ toggleExpand: !prevState.toggleExpand })) }
	
	render() {
		
		let item, i, m = {
			homeTeam: null,
			homePlayers: null,
			homeStats: null,
			homeTopPlayers: null,
			homeColor: null,
			homeTeamStats: null,
			homeTeamRecord: null,
			awayTeam: null,
			awayPlayers: null,
			awayStats: null,
			awayTopPlayers: null,
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
			hasGameStarted: null,
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
		
		// Toggle Star
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
		
		// Toggle Expand
		if (this.state.toggleExpand) { m.gameClass = 'game active' }
		else { m.gameClass = 'game' }

		// Toggle Menu
		if (!this.state.toggleMenu) { m.menuStyle = m.displayNone }
		if (this.state.toggleMenu) { m.menuStyle = m.displayBlock }
		
		// Toglle Share
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

		// Check if game has started OR scores are off
		if ((m.homeScore <= 0 && m.awayScore <= 0) || m.toggleScores === true ) {
			m.homeScoreDisplay = { display: 'none' }
			m.awayScoreDisplay = { display: 'none' }
		}

		// Determine Game Status
		if (m.qtr === null && m.timeMin === null && m.timeSec === null && m.homeScore === null) {
			if (m.sliceTimeMin <= 12) {
				m.headerRight = <b>{m.sliceTimeMin + ':' + m.sliceTimeSec + ' PM / ET'}</b>
			} else {
				m.headerRight = <b>{(m.sliceTimeMin - 12) + ':' + m.sliceTimeSec + ' PM / ET'}</b>
			}
			m.headerLeft = m.stadium.Name
			m.gameBreak = 'AT'
			m.hasGameStarted = false
		} else if (m.qtr === 'F/OT') {
			m.headerLeft = <b>Overtime</b>
			if (m.toggleScores) { m.headerRight = m.stadium.Name }
			else { m.headerRight = m.winningText(m.winningTeam.Name) }
			m.gameBreak = 'FINAL'
			m.hasGameStarted = true
		}	else if (m.qtr === 'Half') {
			m.headerRight = <b>Half Time</b>
			m.headerLeft = m.stadium.Name
			m.gameBreak = 'AT'
			m.hasGameStarted = true
		} else if ((m.qtr === null && m.timeSec === null && m.timeMin === null && m.homeScore > 0) || m.qtr === 'F') {
			m.headerLeft = <b>Full Time</b>
			if (this.props.toggleScores) { m.headerRight = m.stadium.Name }
			else { m.headerRight = m.winningText(m.winningTeam.Name) }
			m.gameBreak = 'FINAL'
			m.hasGameStarted = true
		} else if (m.qtr === '1' || m.qtr === '2' || m.qtr === '3' || m.qtr === '4') {
			let seconds
			if (m.timeSec < 10) { seconds = '0' + m.timeSec }
			else { seconds = m.timeSec }
			let str = m.timeMin + ':' + seconds
			if (m.toggleScores) {
				m.headerLeft = m.stadium.Name
				if (m.sliceTimeMin <= 12) {
					m.headerRight = <b>{m.sliceTimeMin + ':' + m.sliceTimeSec + ' PM / ET'}</b>
				} else {
					m.headerRight = <b>{(m.sliceTimeMin - 12) + ':' + m.sliceTimeSec + ' PM / ET'}</b>
				}
			} else {
				m.headerRight = <b style={m.colorRed} className='blink'>{str}</b>
				m.headerLeft = <b style={m.colorRed}>{'Q' + m.qtr}</b>
			}
			m.gameBreak = 'INP'
			m.hasGameStarted = true
		}

		return (
			<div
				key={this.props.game.GameID}
				data-id={this.props.game.GameID}
				data-index={this.props.index}
				title={m.homeTeam.Name + ' vs ' + m.awayTeam.Name}
				className={m.gameClass}
			>
				{ this.state.toggleExpand ?
					
					<GameExpand
						apiKey={this.props.apiKey}
						m={m}
						date={this.props.date}
						monthsYear={this.props.monthsYear}
						daysWeek={this.props.daysWeek}
						toggleExpand={this.toggleExpand}
					/>
					
					:
					
					<GameInfo
						apiKey={this.props.apiKey}
						m={m}
						date={this.props.date}
						monthsYear={this.props.monthsYear}
						daysWeek={this.props.daysWeek}
						toggleMenu={this.toggleMenu}
						toggleStar={this.toggleStar}
						toggleShare={this.toggleShare}
						toggleExpand={this.toggleExpand}
					/>
				
				}
			</div>
		)
		
	}
}

export default Game