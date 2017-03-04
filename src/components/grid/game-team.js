// Import React
import React from 'react'

const Team = ({ m, team }) => {
	return (
		<div className="game-team">
			<img
				src={m.teamLogoUrl + team.info.Key.toLowerCase() + '.svg'}
				alt={team.info.Name}
			/>
			<p className="game-team-score" style={team.scoreDisplay}>
				<span style={team.scoreStyle}>{team.score}</span>
			</p>
			<div className="game-team-text">
				<h4>{team.info.City}</h4>
				<h3 style={team.color}>{team.info.Name}</h3>
				<p>{team.record}</p>
			</div>
		</div>
	)
}

export default Team