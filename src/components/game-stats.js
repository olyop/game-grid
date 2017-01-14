import React from 'react'
import Request from 'react-http-request'

import '../css/game-stats.css'
import '../css/game-stats-table.css'

class GameStats extends React.Component {
	
	findDateString(date) {
		let monthsYear = this.props.monthsYear
		
		let nowYear = String(date.getFullYear()),
				nowMonth = String(monthsYear[date.getMonth()].abbr),
				nowDate = String(date.getDate() - 1) // -1 for American Time Zone Diff
		
		return nowYear + '-' + nowMonth + '-' + nowDate
	}
	
	render() {
		
		let m = this.props.m,
				homeBody,
				awayBody,
				playerGameStatsUrl = 'https://api.fantasydata.net/v3/nba/stats/JSON/PlayerGameStatsByPlayer/',
				unknownPlayer = {
			info: {
				PhotoUrl: './media/unknown.jpg',
				PlayerID: 'unknown',
				FirstName: 'Cannot Load',
				LastName: 'Player',
				Jersey: '0',
			},
			stats: {
				Games: 10,
				Points: 10,
				Assists: 10,
				Rebounds: 10,
				Steals: 10
			}
		}
		const divideFloor = (a, b) => Math.floor(Number(a) / Number(b))
		
		const Player = ({ player }) => {
			
			let style = { backgroundImage: 'url(' + player.info.PhotoUrl + ')' }
			
			return (
				<div
					className="game-content-main-player"
					data-id={player.info.PlayerID}
				>
					<section title={player.info.FirstName + ' ' + player.info.LastName}>
						<div className="game-content-player-photo" style={style}></div>
						<div className="game-content-player-number">{player.info.Jersey}</div>
					</section>
					<div className="game-content-player-name">
						<p><b>{player.info.FirstName}</b></p>
						<p><b>{player.info.LastName}</b></p>
					</div>
					<div className="game-content-player-stats">
						<div><b>{divideFloor(player.stats.Points, player.stats.Games)}</b> PPG</div>
						<div><b>{divideFloor(player.stats.Assists, player.stats.Games)}</b> APG</div>
						<div><b>{divideFloor(player.stats.Rebounds, player.stats.Games)}</b> RPG</div>
						<div><b>{divideFloor(player.stats.Steals, player.stats.Games)}</b> SPG</div>
					</div>
				</div>
			)
		}
		
		// Map Top Players
		m.homeTopPlayersList = m.home.topPlayers.map((player, index) => {
			
			if (player.info === undefined || player.stats === undefined) {
				return (
					<Player key={index} player={unknownPlayer} />
				)
			}
			
			return <Player key={index} player={player} />
		})
		m.awayTopPlayersList = m.away.topPlayers.map((player, index) => {
			
			if (player.info === undefined || player.stats === undefined) {
				return (
					<Player key={index} player={unknownPlayer} />
				)
			}
			
			return <Player key={index} player={player} />	
		})
		
		let thead = (
			<tr>
				<th className="game-content-main-stats-player" title="Player stats for game">Player</th>
				<th title="Points">PTS</th>
				<th title="Minutes">Min</th>
				<th title="Assists">AST</th>
				<th title="Rebounds">REB</th>
				<th title="Steals">STL</th>
				<th title="Blocks">BLK</th>
				<th title="Turnovers">TOV</th>
				<th title="Plus / Minus">+/-</th>
			</tr>
		)
		
		let PlayerRow = ({ index, gameStats }) => (
			<tr key={index}>
				<td
					className="game-content-main-stats-player"
					title={gameStats.Name}
				>
					<p>{gameStats.Name}</p>
				</td>
				<td><b>{Math.round(gameStats.Points)}</b></td>
				<td>{Math.round(gameStats.Minutes)}</td>
				<td>{Math.round(gameStats.Assists)}</td>
				<td>{Math.round(gameStats.Rebounds)}</td>
				<td>{Math.round(gameStats.Steals)}</td>
				<td>{Math.round(gameStats.BlockedShots)}</td>
				<td>{Math.round(gameStats.Turnovers)}</td>
				<td>{Math.round(gameStats.PlusMinus)}</td>
			</tr>
		)
		
		let gameNotStarted = (
			<tr>
				<td className="game-content-main-stats-all" colSpan="9">Game has not started</td>
			</tr>
		)
		
		let LoadingPlayerStats = ({ text }) => <td className="game-content-main-stats-all" colSpan="9">{text}</td>
		
		if (!m.hasGameStarted) {
			
			homeBody = gameNotStarted
			
		} else if (m.toggleScores) {
			
			homeBody = <LoadingPlayerStats text="Scores are hidden" />
			
		} else {
			
			homeBody = m.home.players.map((player, index) => {
				
				return (
					<Request
						url={playerGameStatsUrl + this.findDateString(this.props.date) + '/' + player.PlayerID}
						headers={this.props.apiKey}
						key={index}
					>
						{
							({error, result, loading}) => {
								if (loading) {
									return <tr><LoadingPlayerStats text={'Loading player game stats'} /></tr>
								} else {
									let gameStats = result.body
									if (gameStats === null) {
										return null
									} else if (gameStats.Minutes === 0) {
										return null
									} else {
										return <PlayerRow index={index} gameStats={gameStats} />
									}
								}
							}
						}
					</Request>
				)
			})
		}
		
		if (!m.hasGameStarted) {
			
			awayBody = gameNotStarted
			
		} else if (m.toggleScores) {
			
			awayBody = <LoadingPlayerStats text="Scores are hidden" />
			
		} else {
			
			awayBody = m.away.players.map((player, index) => {
				return (
					<Request
						url={playerGameStatsUrl + this.findDateString(this.props.date)  + '/' + player.PlayerID}
						headers={this.props.apiKey}
						key={index}
					>
						{
							({error, result, loading}) => {
								if (loading) {
									return <tr><LoadingPlayerStats text={'Loading player game stats'} /></tr>
								} else {
									let gameStats = result.body
									
									if (gameStats === null) {
										return null
									} else if (gameStats.Minutes === 0) {
										return null
									} else {
										return <PlayerRow index={index} gameStats={gameStats} />
									}
								}
							}
						}
					</Request>
				)
			})
		}
		
		return (
			<div className="game-content-main">
				<div className="col-lg-6 game-content-main-left">
					
					<h1>{m.home.info.Name} player game stats</h1>
					<div className="game-content-main-item game-content-main-stats">
						<table>
							<thead>{thead}</thead>
							<tbody>{homeBody}</tbody>
							<tfoot></tfoot>
						</table>
					</div>
					
					<h1>{m.home.info.Name} top 3 players</h1>
					<div className="game-content-main-item game-content-main-players">
						{m.homeTopPlayersList}
					</div>
					
				</div>
				<div className="col-lg-6 game-content-main-right">
					
					<h1>{m.away.info.Name} player game stats</h1>
					<div className="game-content-main-item game-content-main-stats">
						<table>
							<thead>{thead}</thead>
							<tbody>{awayBody}</tbody>
							<tfoot></tfoot>
						</table>
					</div>
					
					<h1>{m.away.info.Name} top 3 players</h1>
					<div className="game-content-main-item game-content-main-players">
						{m.awayTopPlayersList}
					</div>
					
				</div>
			</div>
		)
	}
}

export default GameStats