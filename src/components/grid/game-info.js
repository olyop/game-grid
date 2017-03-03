// Import React
import React from 'react'

// Import Components
import MoreMenu from './game-more-menu'
import ShareMenu from './game-more-share'

const GameInfo = ({ m, t_Star, t_Menu, t_Share, t_Expand }) => {
	
	// Team Component
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

	return (
		<div className="game-inner" style={m.starInner}>

			<div
				className="game-icon game-star"
				title="Star"
				onClick={t_Star}
				style={m.starStyle}
			>
				<i className="material-icons">{m.starType}</i>
			</div>

			<div
				className="game-icon game-more"
				title="More"
				onClick={t_Menu}
			>
				<i className="material-icons">more_vert</i>
			</div>

			{ m.menuBoolean ? <MoreMenu m={m} t_Menu={t_Menu} t_Star={t_Star} /> : null }

			<div
				className="game-icon game-share"
				title="Share"
				onClick={t_Share}
			>
				<i className="material-icons">share</i>
			</div>

			{ m.shareBoolean ? <ShareMenu t_Share={t_Share} /> : null }

			<div
				className="game-icon game-expand"
				title="Expand"
				onClick={t_Expand}
			>
				<i className="material-icons">expand_more</i>
			</div>

				<Team m={m} team={m.home} />

			<div className="game-break">
				<hr />
				<p>VS</p>
				<hr />
			</div>

				<Team m={m} team={m.away} />

			<div className="game-break">
				<hr />
				<p>{m.gameBreak}</p>
				<hr />
			</div>

			<div className="game-header">
				<p>
					{m.info.left}
					{' '}&#8212;{' '}
					{m.info.right}
				</p>
			</div>

		</div>
	)
}

export default GameInfo
