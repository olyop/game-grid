import React from 'react'
import Request from 'react-http-request'
import '../css/games.css'
import GameGrid from './game-grid'
import Calender from './calender'
import Loading from './common/loading'

import teamsObj from './data/teams'
import stadiumsObj from './data/stadiums'

// Get Team Stats
class GetTeamStats extends React.Component {
	render() {
		return (
			<Request
				url='https://api.fantasydata.net/v3/nba/scores/JSON/TeamSeasonStats/2017'
				headers={this.props.apiKey}
			>
				{
					({error, result, loading}) => {
						if (loading) {
							return (
								
								<Loading />
								
							)
						} else {
							return (
								
								<Games
									apiKey={this.props.apiKey}
									date={this.props.date}
									teamStats={result.body}
									teams={teamsObj}
									stadiums={stadiumsObj} />
								
							)
						}
					}
				}
			</Request>
		)
	}
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