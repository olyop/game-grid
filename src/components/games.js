// Import React
import React from 'react'

// Import Components
import Request from 'react-http-request'
import Calender from './calender'
import GameGrid from './grid/game-grid'
import Loading from './common/loading'
import Error from './common/error'

// Import data
import teamsObj from '../data/teams'
import stadiumsObj from '../data/stadiums'

// Import CSS
import '../css/games.css'

// Get Team Stats
const GetTeamStats = props => {
	return (
	
		<Request
			url='https://api.fantasydata.net/v3/nba/scores/JSON/TeamSeasonStats/2017'
			headers={props.apiKey}
		>
			{
				({error, result, loading}) => {
					if (loading) {
						return (

							<Loading />

						)
					} else {
						if (result === undefined || result === null) {
							return (

								<Error
									heading="Cannot connect to API server, connection cannot be established"
									subtitle="Please read this list to diagnose the problem"
									list={[
										'Connection to the server may be blocked by your provider or administrator',
										'Please check your internet connection'
									]} />

							)
						} else {
							return (

								<Games
									apiKey={props.apiKey}
									date={props.date}
									teamStats={result.body}
									teams={teamsObj}
									stadiums={stadiumsObj} />

							)
						}
					}
				}
			}
		</Request>
	
	)
}

// Maim Content
class Games extends React.Component {
	
	constructor(props) {
		super(props)
		
		this.state = { date: this.props.date }
	}
	
	render() {
		return (
			<div id="games">
				<div className="games-container">
					<div className="games-heading">
						
						<Calender
							apiKey={this.props.apiKey}
							date={this.state.date}
							onDayClick={ date => this.setState({ date }) } />
						
					</div>
					<div className="container grid-container">
						
						<GameGrid
							apiKey={this.props.apiKey}
							date={this.state.date}
							teamStats={this.props.teamStats}
							stadiums={this.props.stadiums}
							teams={this.props.teams} />
						
					</div>
				</div>
			</div>
		)
	}
}

export default GetTeamStats	
