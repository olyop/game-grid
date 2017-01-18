import React from 'react'
import Request from 'react-http-request'
import Loading from './common/loading'
import '../css/game-grid.css'
import GamesInfo from './games-info'
import Game from './game'

class GameGrid extends React.Component {
	
	constructor(props) {
		super(props)
		this.state = { toggleScorees: false }
	}
	
	findDateString(date) {
		let monthsYear = this.props.monthsYear
		
		let nowYear = String(date.getFullYear()),
				nowMonth = String(monthsYear[date.getMonth()].abbr),
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
					({ error, result, loading }) => {
						if (loading) {
							return (
								
								<Loading />
								
							)
						} else {
							
							var gameObj = result.body
							
							let gamesList = result.body.map((game, index) => {
								return (
									<Game
										apiKey={this.props.apiKey}
										game={game}
										date={this.props.date}
										monthsYear={this.props.monthsYear}
										daysWeek={this.props.daysWeek}
										teams={this.props.teams}
										teamStats={this.props.teamStats}
										stadiums={this.props.stadiums}
										index={index}
										key={index}
										toggleScores={this.state.toggleScores} />
								)
							})
							
							return (
								<div>
									
									<GamesInfo
										numGames={gameObj.length}
										toggleScores={toggleScores => this.setState({ toggleScores })} />

									<div id="game-grid">{gamesList}</div>
									
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