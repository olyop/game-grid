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
				playerGameStatsUrl = 'https://api.fantasydata.net/v3/nba/stats/JSON/PlayerGameStatsByPlayer/'
		
		let divideFloor = (a, b) => Math.floor(Number(a) / Number(b))
		
		const Player = ({ player, style }) => {
			return (
				<div
					className="game-content-main-player"
					data-id={player.PlayerID}
				>
					<section title={player.info.FirstName + ' ' + player.info.LastName}>
						<div className="game-content-player-photo" style={style}></div>
						<div className="game-content-player-number">{'#' + player.info.Jersey}</div>
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
		m.homeTopPlayersList = m.homeTopPlayers.map((player, index) => {
			let style = { backgroundImage: 'url(' + player.info.PhotoUrl + ')' }
			
			return <Player key={index} player={player} style={style}/>
		})
		m.awayTopPlayersList = m.awayTopPlayers.map((player, index) => {
			let style = { backgroundImage: 'url(' + player.info.PhotoUrl + ')' }
			
			return <Player key={index} player={player} style={style}/>	
		})
		
		let thead = (
			<tr>
				<th className="game-content-main-stats-player" title="Player stats for game">Player</th>
				<th title="Points">PTS</th>
				<th title="Minutes">Min</th>
				<th title="Rebounds">REB</th>
				<th title="Assists">AST</th>
				<th title="Steals">STL</th>
				<th title="Blocks">BLK</th>
				<th title="Turnovers">TOV</th>
			</tr>
		)
		
		let gameNotStarted = (
			<tr>
				<td className="game-content-main-stats-all" colSpan="8">Game has not started</td>
			</tr>
		)
		
		let loadingPlayerStats = (
			<td className="game-content-main-stats-all" colSpan="8">Loading player game stats</td>
		)
		
		if (!m.hasGameStarted) {
			
			homeBody = gameNotStarted
			
		} else {
			
			homeBody = m.homePlayers.map((player, index) => {
				
				return (
					<Request
						url={playerGameStatsUrl + this.findDateString(this.props.date) + '/' + player.PlayerID}
						headers={this.props.apiKey}
						key={index}
					>
						{
							({error, result, loading}) => {
								if (loading) {
									return <tr>{loadingPlayerStats}</tr>
								} else {
									let gameStats = result.body
									return (
										<tr key={index}>
											<td className="game-content-main-stats-player"><p>{gameStats.Name}</p></td>
											<td>{gameStats.Points}</td>
											<td>{gameStats.Assists}</td>
											<td>{gameStats.Rebounds}</td>
											<td>{gameStats.Assists}</td>
											<td>{gameStats.Steals}</td>
											<td>{gameStats.BlockedShots}</td>
											<td>{gameStats.Turnovers}</td>
										</tr>
									) 
								}
							}
						}
					</Request>
				)
			})
		}
		
		if (!m.hasGameStarted) {
			
			awayBody = gameNotStarted
			
		} else {
			
			awayBody = m.awayPlayers.map((player, index) => {
				return (
					<Request
						url={playerGameStatsUrl + this.findDateString(this.props.date)  + '/' + player.PlayerID}
						headers={this.props.apiKey}
						key={index}
					>
						{
							({error, result, loading}) => {
								if (loading) {
									return <tr>{loadingPlayerStats}</tr>
								} else {
									let gameStats = result.body
									return (
										<tr key={index}>
											<td className="game-content-main-stats-player"><p>{gameStats.Name}</p></td>
											<td>{gameStats.Points}</td>
											<td>{gameStats.Assists}</td>
											<td>{gameStats.Rebounds}</td>
											<td>{gameStats.Assists}</td>
											<td>{gameStats.Steals}</td>
											<td>{gameStats.BlockedShots}</td>
											<td>{gameStats.Turnovers}</td>
										</tr>
									) 
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
					
					<h1>{m.homeTeam.Name} player game stats</h1>
					<div className="game-content-main-item game-content-main-stats">
						<table>
							<thead>{thead}</thead>
							<tbody>{homeBody}</tbody>
							<tfoot></tfoot>
						</table>
					</div>
					
					<h1>{m.homeTeam.Name} top 3 players</h1>
					<div className="game-content-main-item game-content-main-players">
						{m.homeTopPlayersList}
					</div>
					
				</div>
				<div className="col-lg-6 game-content-main-right">
					
					<h1>{m.awayTeam.Name} player game stats</h1>
					<div className="game-content-main-item game-content-main-stats">
						<table>
							<thead>{thead}</thead>
							<tbody>{awayBody}</tbody>
							<tfoot></tfoot>
						</table>
					</div>
					
					<h1>{m.awayTeam.Name} top 3 players</h1>
					<div className="game-content-main-item game-content-main-players">
						{m.awayTopPlayersList}
					</div>
					
				</div>
			</div>
		)
	}
}

export default GameStats