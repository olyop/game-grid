import React from 'react'
import Request from 'react-http-request'
import Loading from './loading'
import '../css/game-grid.css'
import GamesInfo from './games-info'
import Game from './game'

class GameGrid extends React.Component {
	
	findDateString(date) {
		let months = this.props.monthsYear,
				nowYear = String(date.getFullYear()),
				nowMonth = String(months[date.getMonth()].abbr),
				nowDate = String(date.getDate() - 1) // -1 for American Time Zone Diff				
		
		return nowYear + '-' + nowMonth + '-' + nowDate
	}
	
	render() {
		return (
			<Request
				url={'https://api.fantasydata.net/v3/nba/scores/json/GamesByDate/' + this.findDateString(this.props.date)}
				headers={this.props.apiKey}
			>
				{
					({error, result, loading}) => {
						if (loading) {
							return (
								<Loading />
							)
						} else {
							
							var gameObj = result.body
							
							// DEV: Log API
							console.log({teams: this.props.teams})
							console.log({games: gameObj})
							console.log({teamStats: this.props.teamStats})
							console.log({staidums: this.props.stadiums})
							
							let gamesList = result.body.map((game, index) => {
								return (
									<Game
										game={game}
										teams={this.props.teams}
										teamStats={this.props.teamStats}
										stadiums={this.props.stadiums}
										index={index}
										key={index}
									/>
								)
							})
							
							return (
								<div>
									
									<GamesInfo
										numGames={gameObj.length}
									/>

									<div id="game-grid">
										{gamesList}
									</div>

								</div>
							)
						}
					}
				}
			</Request>
		)
	}
}

export default GameGrid