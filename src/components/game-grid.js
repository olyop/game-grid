import React from 'react'
import Request from 'react-http-request'
import Loading from './loading.js'
import '../css/game-grid.css'
import GamesInfo from './games-info.js'
import Game from './game.js'

class GameGrid extends React.Component {
	
	render() {
		return (
			<Request
				url={'https://api.fantasydata.net/v3/nba/scores/json/GamesByDate/' + this.findDateString(this.props.date)}
				headers={this.props.apiKey}
			>
				{
					({error, result, loading}) => {
						if (loading) {
							console.log(loading)
							return (
								<Loading />
							)
						} else {
							console.log(loading)
							return (
								<GameGridInner
									teamStats={this.props.teamStats}
									stadiums={this.props.stadiums}
									games={result.body}
									teams={this.props.teams}
								/>
							)
						}
					}
				}
			</Request>
		)
	}
	
	findDateString(date) {
		let months = this.props.monthsYear,
				nowYear = String(date.getFullYear()),
				nowMonth = String(months[date.getMonth()].abbr),
				nowDate = String(date.getDate() - 1) // -1 for American Time Zone Diff				
		
		return nowYear + '-' + nowMonth + '-' + nowDate
	}
	
}

class GameGridInner extends React.Component {
	
	componentWillMount() {
		// DEV: Log API
		console.log({teams: this.props.teams})
		console.log({teamStats: this.props.teamStats})
		console.log({staidums: this.props.stadiums})
	}
	
	render() {
		
		// DEV: Log API
		console.log({games: this.props.games})
		
		let gamesList = this.props.games.map((game, index) => {
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
					games={this.props.games}
				/>
				
				<div id="game-grid">
					{gamesList}
				</div>
				
			</div>
		)
	}
}

export default GameGrid