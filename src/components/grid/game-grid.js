// Import React
import React from 'react'

// Components
import Request from 'react-http-request'
import Loading from '../common/loading'
import GamesInfo from './games-info'
import Game from './game'

// Import Data
import { findDateString } from '../../data/calender-data'

// Import Css
import '../../css/game-grid.css'

class GameGrid extends React.Component {
	
	constructor(props) {
		super(props)
		
		this.state = { toggleScores: false }
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
						} else if (error) {
							console.log(error)
							return (

								<Error
									heading={'Cannot connect to API server'}
									subtitle={ String(error) } 
									listTitle="Please read this list to diagnose the problem"
									list={[
										'Connection to the server may be blocked by your provider or administrator',
										'Please check your internet connection'
									]} />

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
										toggleScores={ toggleScores => this.setState({ toggleScores }) } />

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