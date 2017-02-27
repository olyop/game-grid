// Import React
import React from 'react'

// Import Components
import Request from 'react-http-request'

// Import data
import { unknownPlayer } from '../../data/unknown'
import { findDateString } from '../../data/calender-data'
import gameExpandHead from '../../data/game-expand-head'

// Import Css
import '../../css/game-stats.css'
import '../../css/game-stats-table.css'

class GameStats extends React.Component {
	render() {
		
		const m = this.props.m,
					thead = gameExpandHead,
					playerGameStatsUrl =
						'https://api.fantasydata.net/' +
						'v3/nba/stats/JSON/PlayerGameStatsByPlayer/'
		
		const DefaultRow = ({ text }) => {
			return (
				<tr>
					<td className="game-content-main-stats-all" colSpan="9">{text}</td>
				</tr>
			)
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
						<div>Points: <b>{divideFloor(player.stats.Points, player.stats.Games)}</b></div>
						<div>Steals: <b>{divideFloor(player.stats.Steals, player.stats.Games)}</b></div>
						<div>Assists: <b>{divideFloor(player.stats.Assists, player.stats.Games)}</b></div>
						<div>Rebounds: <b>{divideFloor(player.stats.Rebounds, player.stats.Games)}</b></div>
					</div>
				</div>
			)
		}
		
		const mapTopPlayerList = players => {
			
			let temp = players.map((player, index) => {

				if (player.info === undefined || player.stats === undefined) {
					return (
						<Player key={index} player={unknownPlayer} />
					)
				}

				return <Player key={index} player={player} />
			})
			
			return temp
		}
		
		const mapTableBody = playerList => {
			
			const PlayerRow = ({ index, player, gameStats }) => {

				let name = player.FirstName + ' ' + player.LastName

				return (
					<tr>
						<td
							className="game-content-main-stats-player"
							title={name} 
						>
							<p>{name}</p>
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
			}
			
			const temp = playerList.map((player, index) => {
				return (
					<Request
						url={playerGameStatsUrl + findDateString(this.props.date) + '/' + player.PlayerID}
						headers={this.props.apiKey}
						key={index}
					>
						{
							({error, result, loading}) => {
								if (loading) {
									return null
								} else {
									let gameStats = result.body
									if (gameStats === null) {
										return null
									} else if (gameStats.Minutes === 0) {
										return null
									} else {
										return (
											
											<PlayerRow
												key={index}
											 	player={player}
											 	gameStats={gameStats} />
											
										)
									}
								}
							}
						}
					</Request>
				)
			})
			
			return temp
		}
		
		const findMapPlayerStats = players => {
			
			let temp
			
			if (!m.hasGameStarted) { temp = <DefaultRow text="Game has not started" /> }
			else if (m.toggleScores) { temp = <DefaultRow text="Scores are hidden" /> }
			else { temp = mapTableBody(players) }
			
			return temp
		}
		
		const findTopPlayers = team => {
			
			let temp = [
				{ info: null, stats: null },
				{ info: null, stats: null },
				{ info: null, stats: null }
			];
			
			let	teamLength = team.players.length,
					i = 0, item
			
			while (i < 3) {

				let playerStats = team.stats[i],
						player, a = 0;

				// Find Player Stats
				for (a; a < teamLength; a++) {
					item = team.players[a]
					if (playerStats.PlayerID === item.PlayerID) {
						player = item
						break
					}
				}

				temp[i].stats = playerStats
				temp[i].info = player

				i++
			}
			
			return temp
		}
	
		m.home.body = findMapPlayerStats(m.home.players)
		m.away.body = findMapPlayerStats(m.away.players)
		
		m.home.topPlayersList = mapTopPlayerList(findTopPlayers(m.home))
		m.away.topPlayersList = mapTopPlayerList(findTopPlayers(m.away))
		
		const TeamStatsMain = ({ team }) => {
			return (
				<div>
					<h1>{team.info.Name} player game stats</h1>
					<div className="game-content-main-item game-content-main-stats">
						<table>
							<thead>{thead}</thead>
							<tbody>{team.body}</tbody>
						</table>
					</div>

					<h1>{team.info.Name} Top 3 Players this Season</h1>
					<div className="game-content-main-item game-content-main-players">
						{team.topPlayersList}
					</div>
				</div>
			)
		}
		
		return (
			<div className="game-content-main">
				<div className="col-lg-6 game-content-main-left">
					
					<TeamStatsMain team={m.home} />
					
				</div>
				<div className="col-lg-6 game-content-main-right">
					
					<TeamStatsMain team={m.away} />
					
				</div>
			</div>
		)
	}
}

export default GameStats
