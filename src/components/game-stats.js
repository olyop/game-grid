import React from 'react'
import Request from 'react-http-request'

import '../css/game-stats.css'
import '../css/game-stats-table.css'

class GameStats extends React.Component {
	render() {
		
		let m = this.props.m
		
		let divideFloor = (a, b) => Math.floor(Number(a) / Number(b)),
				Player = ({ player, style }) => {
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
				<th className="game-content-main-stats-player">Player</th>
				<th className="game-content-main-stats-stat">PTS</th>
				<th className="game-content-main-stats-stat">Min</th>
				<th className="game-content-main-stats-stat">REB</th>
				<th className="game-content-main-stats-stat">AST</th>
				<th className="game-content-main-stats-stat">STL</th>
				<th className="game-content-main-stats-stat">BLK</th>
				<th className="game-content-main-stats-stat">TOV</th>
			</tr>
		)
		
		console.log(this.props.monthsYear)
		
		let homeBody = m.homePlayers.map((player, index) => {
			
			const d = this.props.date
			
			let dateString = d.getFullYear() + '-' + this.props.monthsYear[d.getMonth()].abbr + '-' + (d.getDate()-1)
			
			return (
				<Request
					url={'https://api.fantasydata.net/v3/nba/stats/JSON/PlayerGameStatsByPlayer/' + dateString + '/' + player.PlayerID}
					headers={this.props.apiKey}
				>
					{
						({error, result, loading}) => {
							if (loading) {
								return <tr key={index}></tr>
							} else {
								let gameStats = result.body
								return (
									<tr key={index}>
										<td className="game-content-main-stats-player"><p>{gameStats.Name}</p></td>
										<td className="game-content-main-stats-stat">{gameStats.Points}</td>
										<td className="game-content-main-stats-stat">{gameStats.Assists}</td>
										<td className="game-content-main-stats-stat">{gameStats.Rebounds}</td>
										<td className="game-content-main-stats-stat">{gameStats.Assists}</td>
										<td className="game-content-main-stats-stat">{gameStats.Steals}</td>
										<td className="game-content-main-stats-stat">{gameStats.BlockedShots}</td>
										<td className="game-content-main-stats-stat">{gameStats.Turnovers}</td>
									</tr>
								) 
							}
						}
					}
				</Request>
			)
		})
		
		let awayBody = m.awayPlayers.map((player, index) => {
			
			const d = this.props.date
			
			let dateString = d.getFullYear() + '-' + this.props.monthsYear[d.getMonth()].abbr + '-' + (d.getDate()-1)
			
			return (
				<Request
					url={'https://api.fantasydata.net/v3/nba/stats/JSON/PlayerGameStatsByPlayer/' + dateString + '/' + player.PlayerID}
					headers={this.props.apiKey}
				>
					{
						({error, result, loading}) => {
							if (loading) {
								return <tr key={index}></tr>
							} else {
								let gameStats = result.body
								return (
									<tr key={index}>
										<td className="game-content-main-stats-player"><p>{gameStats.Name}</p></td>
										<td className="game-content-main-stats-stat">{gameStats.Points}</td>
										<td className="game-content-main-stats-stat">{gameStats.Assists}</td>
										<td className="game-content-main-stats-stat">{gameStats.Rebounds}</td>
										<td className="game-content-main-stats-stat">{gameStats.Assists}</td>
										<td className="game-content-main-stats-stat">{gameStats.Steals}</td>
										<td className="game-content-main-stats-stat">{gameStats.BlockedShots}</td>
										<td className="game-content-main-stats-stat">{gameStats.Turnovers}</td>
									</tr>
								) 
							}
						}
					}
				</Request>
			)
		})
		
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