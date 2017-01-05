import React from 'react'
import Request from 'react-http-request'
import '../css/games.css'
import GameGrid from './game-grid'
import Calender from './calender'
import Loading from './loading'

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
									date={this.props.date}
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
									date={this.props.date}
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
										date={this.props.date}
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
		this.state = {
			date: this.props.date
		}
	}
	
	render() {
		return (
			<div id="games">
				<div className="games-container">
					<div className="games-heading">
						
						<Calender
							apiKey={this.props.apiKey}
							date={this.state.date}
							monthsYear={this.props.monthsYear}
							daysWeek={this.props.daysWeek}
							onDayClick={date => this.setState({ date })}
						/>
							
					</div>
					<div className="container grid-container">
						
						<GameGrid
							apiKey={this.props.apiKey}
							date={this.state.date}
							monthsYear={this.props.monthsYear}
							teamStats={this.props.teamStats}
							stadiums={this.props.stadiums}
							teams={this.props.teams}
						/>
						
					</div>
				</div>
			</div>
		)
	}
	
}

export default GetTeams															