import React from 'react'
import Request from 'react-http-request'
import { unknownPlayer, topPlayersObj } from './data/unknown'
import { findDateString } from './data/calender-data'

import '../css/game-stats.css'
import '../css/game-stats-table.css'

class GameStats extends React.Component {
	render() {
		
		const m = this.props.m,
				playerGameStatsUrl =
					'https://api.fantasydata.net/' +
					'v3/nba/stats/JSON/PlayerGameStatsByPlayer/'
		
		const thead = (
			<tr>
				<th className="game-content-main-stats-player" title="Player stats for game">Player</th>
				<th title="Points">PTS</th>
				<th title="Minutes">MIN</th>
				<th title="Assists">AST</th>
				<th title="Rebounds">REB</th>
				<th title="Steals">STL</th>
				<th title="Blocks">BLK</th>
				<th title="Turnovers">TOV</th>
				<th title="Plus / Minus">+/-</th>
			</tr>
		)
		
		const DefaultRow = ({ text }) => {
			return (
				<tr>
					<td className="game-content-main-stats-all" colSpan="9">{text}</td>
				</tr>
			)
		}
		
		const divideFloor = (a, b) => Math.floor(Number(a) / Number(b))
		
		const Player = ({ index, player }) => {
			
			let style = { backgroundImage: 'url(' + player.info.PhotoUrl + ')' }
			
			return (
				<div
					className="game-content-main-player"
					data-id={player.info.PlayerID}
					data-key={index}
					key={index}
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
		
		const mapTopPlayerList = (players) => {
			
			let temp = players.map((player, index) => {

				if (player.info === undefined || player.stats === undefined) {
					return (
						<Player key={index} index={index} player={unknownPlayer} />
					)
				}

				return <Player key={index} player={player} />
			})
			
			return temp
		}
		
		const mapTableBody = (playerList) => {
			
			let PlayerRow = ({ index, player, gameStats }) => {

				let name = player.FirstName + ' ' + player.LastName;

				return (
					<tr key={index}>
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
												index={index}
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
		
		const findMapPlayerStats = (players) => {
			
			let temp
			
			if (!m.hasGameStarted) { temp = <DefaultRow text="Game has not started" /> }
			else if (m.toggleScores) { temp = <DefaultRow text="Scores are hidden" /> }
			else if (m.isQtr) { temp = mapTableBody(players) }
			else { temp = mapTableBody(players) }
			
			return temp
		}
		
		const findTopPlayers = (team, topPlayersObj) => {
			
			let temp = topPlayersObj,
					teamLength = team.players.length,
					i = 0, item
			
			while (i < 3) {

				let playerStats = team.stats[i],
						player

				// Find Player Stats
				for (var a = 0; a < teamLength; a++) {
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
		
		m.home.topPlayers = findTopPlayers(m.home, topPlayersObj)
		m.away.topPlayers = findTopPlayers(m.away, topPlayersObj)
		
		m.home.body = findMapPlayerStats(m.home.players)
		m.away.body = findMapPlayerStats(m.away.players)
		
		m.home.topPlayersList = mapTopPlayerList(m.home.topPlayers)
		m.away.topPlayersList = mapTopPlayerList(m.away.topPlayers)
		
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

					<h1>{team.info.Name} top 3 players</h1>
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