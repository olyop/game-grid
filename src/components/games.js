import React from 'react'
import Request from 'react-http-request'
import '../css/games.css'
import 'react-datepicker/dist/react-datepicker.css'
import GameGrid from './game-grid.js'
import Calender from './calender.js'
import Loading from './loading.js'

class GetTeams extends React.Component {
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
								<GetStadiums
									apiKey={this.props.apiKey}
									daysWeek={this.props.daysWeek}
									monthsYear={this.props.monthsYear}
									teamStats={result.body}
								/>
							)
						}
					}
				}
			</Request>
		)
	}
}

class GetStadiums extends React.Component {
	render() {
		return (
			<Request
				url='https://api.fantasydata.net/v3/nba/scores/json/Stadiums'
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
								<GetTeamStats
									apiKey={this.props.apiKey}
									daysWeek={this.props.daysWeek}
									monthsYear={this.props.monthsYear}
									teamStats={this.props.teamStats}
									stadiums={result.body}
								/>
							)
						}
					}
				}
			</Request>
		)
	}
}

class GetTeamStats extends React.Component {
	render() {
		return (
			<Request
					url='https://api.fantasydata.net/v3/nba/scores/JSON/teams'
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
										daysWeek={this.props.daysWeek}
										monthsYear={this.props.monthsYear}
										teamStats={this.props.teamStats}
										stadiums={this.props.stadiums}
										teams={result.body}
									/>
								)
							}
						}
					}
				</Request>
		)
	}
}

class Games extends React.Component {
	constructor(props) {
		super(props)
		this.date = new Date()
	}
	render() {
		return (
			<div id="games">
				<div className="games-container">
					<div className="games-heading">
						
						<Calender
							date={this.date}
							daysWeek={this.props.daysWeek}
							monthsYear={this.props.monthsYear}
						/>
							
					</div>
					<div className="container grid-container">
						
						<GameGrid
							apiKey={this.props.apiKey}
							monthsYear={this.props.monthsYear}
							teamStats={this.props.teamStats}
							stadiums={this.props.stadiums}
							teams={this.props.teams}
							date={this.date}
						/>
						
					</div>
				</div>
			</div>
		)
	}
}

export default GetTeams																