// Import React
import React from 'react'

// Import Components
import Request from 'react-http-request'
import Loading from '../common/loading'
import GameStats from './game-stats'
import Button from '../common/button'

// Import Data
import { hexToRgba, colorLuminance } from '../../data/maths'

// Import CSS
import '../../css/game-expand.css'

// Get Player Info/Stats
const GetPlayersHome = props => {
		
	let m = props.m

	return (
		<Request
			url={'https://api.fantasydata.net/v3/nba/stats/JSON/Players/' + m.home.info.Key}
			headers={props.apiKey}
		>
			{
				({error, result, loading}) => {
					if (loading) {
						return (

							<Loading />

						)
					} else {
						let temp = result.body
						return (
							<Request
								url={'https://api.fantasydata.net/v3/nba/stats/JSON/PlayerSeasonStatsByTeam/' + props.date.getFullYear() + '/' + m.home.info.Key}
								headers={props.apiKey}
							>
								{
									({error, result, loading}) => {
										if (loading) {
											return (

												<Loading />

											)
										} else {
											return (

												<GetPlayersAway
													apiKey={props.apiKey}
													m={m}
													date={props.date}
													t_Expand={props.t_Expand}
													t_Star={props.t_Star}
													homeTeamPlayers={temp}
													homeTeamPlayerStats={result.body} />

											)
										}
									}
								}
							</Request>
						)
					}
				}
			}
		</Request>
	)
}
const GetPlayersAway = props => {
		
	let m = props.m;

	return (
		<Request
			url={'https://api.fantasydata.net/v3/nba/stats/JSON/Players/' + m.away.info.Key}
			headers={props.apiKey}
		>
			{
				({error, result, loading}) => {
					if (loading) {
						return (

							<Loading />

						)
					} else {
						let temp = result.body
						return (
							<Request
								url={'https://api.fantasydata.net/v3/nba/stats/JSON/PlayerSeasonStatsByTeam/' + props.date.getFullYear() + '/' + m.away.info.Key}
								headers={props.apiKey}
							>
								{
									({error, result, loading}) => {
										if (loading) {
											return (

												<Loading />

											)
										} else {
											return (

												<GameExpand
													apiKey={props.apiKey}
													m={m}
													date={props.date}
													t_Star={props.t_Star}
													t_Expand={props.t_Expand}
													homeTeamPlayers={props.homeTeamPlayers}
													homeTeamPlayerStats={props.homeTeamPlayerStats}
													awayTeamPlayers={temp}
													awayTeamPlayerStats={result.body} />

											)
										}
									}
								}
							</Request>
						)
					}
				}
			}
		</Request>
	)
}

class GameExpand extends React.Component {
	
	render() {
		
		let m = this.props.m,
				logourl = './media/team-logos/',
				luminance = '0.5', opacity = '0.4',
				boxShadow = 'inset 0px 0px 100px 25px '
		
		m.home.players = this.props.homeTeamPlayers
		m.away.players = this.props.awayTeamPlayers
		m.home.stats = this.props.homeTeamPlayerStats
		m.away.stats = this.props.awayTeamPlayerStats
		
		const findAwayStyle = team => {
			
			let temp = {
				background: {
					backgroundColor: team.color.color,
					boxShadow:
						boxShadow +
						hexToRgba(colorLuminance(team.color.color, luminance), opacity)
				},
				backgroundColor: { backgroundColor: team.color.color },
				backgroundImg: { backgroundImage: 'url(' + logourl + team.info.Key.toLowerCase() + '.svg)' }
			}
			
			return temp
		}
		
		const ContentTeam = ({ team }) => {
			
			const temp = team === m.home ? 'left' : 'right'
			
			return (
				<div
					className={'col-md-6 game-content-team game-content-' + temp}
					style={team.style.background}
				>
					<div className="game-content-title">
						<a
							href={'http://www.nba.com/' + team.info.Name.toLowerCase()}
							target="_blank"
							title={team.info.Name}
						>
							<section style={team.style.backgroundImg}></section>
						</a>
						<div className="game-content-title-text">
							<h2>{team.info.City}</h2>
							<h1>{team.info.Name}</h1>
							<p>{team.record}</p>
						</div>
						<h2 style={team.scoreDisplay}>{team.score}</h2>
					</div>
				</div>
			)
		}
		
		m.home.style = findAwayStyle(m.home)
		m.away.style = findAwayStyle(m.away)
		
		// Sort player stats by points
		m.home.stats.sort((a, b) => b.Points - a.Points)
		m.away.stats.sort((a, b) => b.Points - a.Points)
		
		return (
			<div className="game-content">
				<div className="container-fluid game-content-inner">
					<div className="row">
						
						<ContentTeam team={m.home} />
						
						<div
							className="game-content-close"
							onClick={this.props.t_Expand}
						>
							<i className="material-icons">expand_less</i>
						</div>
						
						<div className="game-content-vs">
							<p>VS</p>
						</div>
						
						<ContentTeam team={m.away} />
						
					</div>
					<div className="row">
						<div className="game-content-info">
							<p>Home</p>
							<p>{m.info.left} &#8211; {m.info.right}</p>
							<p>Away</p>
						</div>
					</div>
					<div className="row">
						<div className="game-content-main-buttons">
						
							<div>
								
								<Button
									hasIcon={true}
									iconText="share"
									text="Share"
									style={{ margin: '0 20px 0 0' }} />
								
							</div>
								
							<div onClick={this.props.t_Star}>
								
								<Button
									hasIcon={true}
									iconText={m.starType}
									text={m.starText}
									style={{ padding: '15px' }} />
								
							</div>
							
						</div>
					</div>
					<div className="row game-content-info-border">
							
						<GameStats
							apiKey={this.props.apiKey}
							m={m}
							date={this.props.date}
							findDateString={this.props.findDateString} />
						
					</div>
				</div>
			</div>
		)
	}
}

export default GetPlayersHome
