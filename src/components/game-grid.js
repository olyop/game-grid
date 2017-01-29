import React from 'react'
import Request from 'react-http-request'
import Loading from './common/loading'
import GamesInfo from './games-info'
import Game from './game'
import { findDateString } from './data/calender-data'

import '../css/game-grid.css'

class GameGrid extends React.Component {
	
	constructor(props) {
		super(props)
		
		this.state = { toggleScorees: false }
	}
	
	render() {
		return (
			<Request
				url={'https://api.fantasydata.net/v3/nba/scores/json/GamesByDate/' + findDateString(this.props.date)}
				headers={this.props.apiKey}
			>
				{
					({ error, result, loading }) => {
						if (loading) {
							return (
								
								<Loading />
								
							)
						} else {
							
							const gameObj = result.body
							
							let gamesList = gameObj.map((game, index) => {
								return (
									
									<Game
										apiKey={this.props.apiKey}
										game={game}
										date={this.props.date}
										teams={this.props.teams}
										teamStats={this.props.teamStats}
										stadiums={this.props.stadiums}
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