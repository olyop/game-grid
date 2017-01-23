import React from 'react'
import GameInfo from './game-info'
import GameExpand from './game-expand'
import '../css/more-menu.css'

class Game extends React.Component {
	
	constructor() {
		super()
		
		this.state = {
			t_Menu: false,
			t_Star: false,
			t_Share: false,
			t_Expand: false
		}
		this.t_Menu = this.t_Menu.bind(this)
		this.t_Star = this.t_Star.bind(this)
		this.t_Expand = this.t_Expand.bind(this)
		this.t_Share = this.t_Share.bind(this)
	}
	
	// Toggle Functions
	t_Star() { this.setState(prevState => ({ t_Star: !prevState.t_Star })) }
	t_Menu() { this.setState(prevState => ({ t_Menu: !prevState.t_Menu })) }
	t_Share() { this.setState(prevState => ({ t_Share: !prevState.t_Share })) }
	t_Expand() { this.setState(prevState => ({ t_Expand: !prevState.t_Expand })) }
	
	render() {
		
		let item, i, m = {
			home: {
				score: this.props.game.HomeTeamScore,
				info: null,
				players: null,
				stats: null,
				topPlayers: null,
				color: null,
				record: null,
				scoreDisplay: null,
				scoreStyle: null
			},
			away: {
				score: this.props.game.AwayTeamScore,
				info: null,
				players: null,
				stats: null,
				topPlayers: null,
				color: null,
				record: null,
				scoreDisplay: null,
				scoreStyle: null
			},
			info: {
				left: null,
				right: null
			},
			colors: {
				tie: { color: '#FF9800' },
				red: { color: '#F44336' },
				green: { color: '#4CAF50' }
			},
			stadium: null,
			gameBreak: null,
			teamsLength: this.props.teams.length,
			stadiumsLength: this.props.stadiums.length,
			teamStatsLength: this.props.teamStats.length,
			displayBlock: { display: 'block' },
			displayNone: { display: 'none' },
			qtr: this.props.game.Quarter,
			hasGameStarted: null,
			timeSec: this.props.game.TimeRemainingSeconds,
			timeMin: this.props.game.TimeRemainingMinutes,
			time: this.props.game.DateTime,
			toggleScores: this.props.toggleScores,
			nbaWebsiteUrl: 'http://www.nba.com/',
			teamLogoUrl: './media/team-logos/',
			winningTeam: null,
			menuStyle: null,
			starType: null,
			starText: '',
			starStyle: null,
			shareStyle: null,
			starInner: null,
			gameClass: null,
			sliceTimeMin: null,
			sliceTimeSec: null,
			winningText: null,
			isQtr: null,
			isTime: null
		}

		// Find Home Team
		for (i = 0; i < m.teamsLength; i++) {
			item = this.props.teams[i]
			if (this.props.game.HomeTeamID === item.TeamID) {
				m.home.info = item
				break
			}
		}
		
		// Find Away Team
		for (i = 0; i < m.teamsLength; i++) {
			item = this.props.teams[i]
			if (this.props.game.AwayTeamID === item.TeamID) {
				m.away.info = item
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
			if (m.home.info.TeamID === item.TeamID) {
				m.home.stats = item
				break
			}
		}
		
		// Find Away Team Stats
		for (i = 0; i < m.teamStatsLength; i++) {
			item = this.props.teamStats[i]
			if (m.away.info.TeamID === item.TeamID) {
				m.away.stats = item
				break
			}
		}
		
		// Declare after ID Matches
		m.home.color = { color: '#' + m.home.info.PrimaryColor }
		m.away.color = { color: '#' + m.away.info.PrimaryColor }
		m.home.record = m.home.stats.Wins + ' - ' + m.home.stats.Losses
		m.away.record = m.away.stats.Wins + ' - ' + m.away.stats.Losses
		m.sliceTimeMin = m.time.slice(11,13)
		m.sliceTimeSec = m.time.slice(14,16)
		m.winningText = name => <b><span style={m.colors.green}>{name}</span></b>;

		// Check for Errors
		if (m.home.info.Name === 'Celtics') { m.home.color = { color: '#2E7B3B' } }
		if (m.away.info.Name === 'Celtics') { m.away.color = { color: '#2E7B3B' } }
		if (m.home.info.Name === 'Timberwolves') { m.home.color = { color: '#005083' } }
		if (m.away.info.Name === 'Timberwolves') { m.away.color = { color: '#005083' } }
		if (m.home.info.Name === 'Spurs') { m.home.color = { color: '#212121' } }
		if (m.away.info.Name === 'Spurs') { m.away.color = { color: '#212121' } }
		if (m.home.info.Name === 'Nets') { m.home.color = { color: '#212121' } }
		if (m.away.info.Name === 'Nets') { m.away.color = { color: '#212121' } }
		if (m.stadium.Name === 'Oracle Center') { m.stadium.Name = 'Oracle Arena' }
		
		// Toggle Star
		if (this.state.t_Star) {
			m.starType = 'star'
			m.starStyle = m.displayBlock
			m.starInner = { borderColor: '#212121' }
			m.starText = 'Starred'
		}
		else {
			m.starType = 'star_border'
			m.starStyle = null
			m.starInner = null
		}
		
		m.gameClass = this.state.t_Expand ? 'game active' : 'game' 
		m.menuStyle = this.state.t_Menu ? m.displayBlock : m.displayNone
		m.shareStyle = this.state.t_Share ? m.displayBlock : m.displayNone
		
		m.isQtr = m.qtr === '1' || m.qtr === '2' || m.qtr === '3' || m.qtr === '4'
		m.isTime = m.timeSec === null && m.timeMin === null
		
		// Determine who is Winning
		if (m.home.score === m.away.score) {
			m.home.scoreStyle = m.colors.tie
			m.away.scoreStyle = m.colors.tie
		} else if (m.home.score > m.away.score) {
			m.winningTeam = m.home.info
			m.home.scoreStyle = m.colors.green
			m.away.scoreStyle = m.colors.red
		} else if (m.away.score > m.home.score) {
			m.winningTeam = m.away.info
			m.away.scoreStyle = m.colors.green
			m.home.scoreStyle = m.colors.red
		}

		// Check if game has started OR scores are off
		if ((m.home.score <= 0 && m.away.score <= 0) || m.toggleScores) {
			m.home.scoreDisplay = { display: 'none' }
			m.away.scoreDisplay = { display: 'none' }
		}

		// Determine Game Status
		if (m.qtr === null && m.isTime && m.home.score === null) {
			if (m.sliceTimeMin <= 12) {
				m.info.right = <b>{m.sliceTimeMin + ':' + m.sliceTimeSec + ' PM / ET'}</b>
			} else {
				m.info.right = <b>{(m.sliceTimeMin - 12) + ':' + m.sliceTimeSec + ' PM / ET'}</b>
			}
			m.info.left = m.stadium.Name
			m.gameBreak = 'AT'
			m.hasGameStarted = false
		} else if (m.qtr === 'F/OT') {
			m.info.left = <b>Overtime</b>
			if (m.toggleScores) { m.info.right = m.stadium.Name }
			else { m.info.right = m.winningText(m.winningTeam.Name) }
			m.gameBreak = 'FINAL'
			m.hasGameStarted = true
		}	else if (m.qtr === 'Half') {
			m.info.right = <b>Half Time</b>
			m.info.left = m.stadium.Name
			m.gameBreak = 'AT'
			m.hasGameStarted = true
		} else if ((m.qtr === null && m.isTime && m.home.score > 0) || m.qtr === 'F') {
			m.info.left = <b>Full Time</b>
			if (m.toggleScores) { m.info.right = m.stadium.Name }
			else { m.info.right = m.winningText(m.winningTeam.Name) }
			m.gameBreak = 'FINAL'
			m.hasGameStarted = true
		} else if (m.isQtr && m.isTime === true) {
			let str
			if (m.qtr === '1') { str = 'st' }
			else if (m.qtr === '2') { str = 'nd' }
			else if (m.qtr === '3') { str = 'rd' }
			else if (m.qtr === '4') { str = 'th' }
			
			m.info.left = <b>{'End of ' + m.qtr + str + ' Quarter'}</b>
			m.info.right = m.stadium.Name
			m.gameBreak = 'INP'
			m.hasGameStarted = true
		} else if (m.isQtr) {
			let seconds
			if (m.timeSec < 10) { seconds = '0' + m.timeSec }
			else { seconds = m.timeSec }
			let str = m.timeMin + ':' + seconds
			if (m.toggleScores) {
				m.info.right = m.stadium.Name
				if (m.sliceTimeMin <= 12) {
					m.info.left = <b>{m.sliceTimeMin + ':' + m.sliceTimeSec + ' PM / ET'}</b>
				} else {
					m.info.left = <b>{(m.sliceTimeMin - 12) + ':' + m.sliceTimeSec + ' PM / ET'}</b>
				}
			} else {
				m.info.right = <b style={m.colors.red} className='blink'>{str}</b>
				m.info.left = <b style={m.colors.red}>{'Q' + m.qtr}</b>
			}
			m.gameBreak = 'INP'
			m.hasGameStarted = true
		}
		
		let gameSwitch
		
		if (this.state.t_Expand) {
			gameSwitch = (
				
				<GameExpand
					apiKey={this.props.apiKey}
					m={m}
					date={this.props.date}
					monthsYear={this.props.monthsYear}
					daysWeek={this.props.daysWeek}
					t_Expand={this.t_Expand}
					t_Star={this.t_Star} />
				
			)
		} else {
			gameSwitch = (
			
				<GameInfo
					apiKey={this.props.apiKey}
					m={m}
					date={this.props.date}
					monthsYear={this.props.monthsYear}
					daysWeek={this.props.daysWeek}
					t_Menu={this.t_Menu}
					t_Star={this.t_Star}
					t_Share={this.t_Share}
					t_Expand={this.t_Expand} />
			
			)
		}

		return (
			<div
				key={this.props.game.GameID}
				data-id={this.props.game.GameID}
				data-index={this.props.index}
				title={m.home.info.Name + ' vs ' + m.away.info.Name}
				className={m.gameClass}
			>
				{gameSwitch}
			</div>
		)
		
	}
}

export default Game