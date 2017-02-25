// Import React
import React from 'react'

// Import Components
import MoreMenu from './game-more-menu'

class GameInfo extends React.Component {
	render() {
		
		let m = this.props.m
		
		const Team = ({ team }) => {
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
					onClick={this.props.t_Star}
					style={m.starStyle}
				>
					<i className="material-icons">{m.starType}</i>
				</div>
				<div
					className="game-icon game-more"
					title="More"
					onClick={this.props.t_Menu}
				>
					<i className="material-icons">more_vert</i>
				</div>
				
				<MoreMenu
					m={m}
					t_Menu={this.props.t_Menu}
					t_Star={this.props.t_Star}
					/>
				
				<div
					className="game-icon game-share"
					title="Share"
					onClick={this.props.t_Share}
				>
					<i className="material-icons">share</i>
				</div>
				<div className="game-share-menu more-menu" style={m.shareStyle}>
					<p>
						<img src="./media/instagram.png" alt='Instagram logo' />
						<span>Instagram</span>
					</p>
					<p>
						<img src="./media/facebook.png" alt='Facebook logo' />
						<span>Facebook</span>
					</p>
					<p>
						<img src="./media/twitter.png" alt='Twitter logo' />
						<span>Twitter</span>
					</p>
					<p>
						<img src="./media/reddit.png" alt='Reddit logo' />
						<span>Reddit</span>
					</p>
					<hr />
					<p
						className="close-menu"
						onClick={this.props.t_Share}
					>
						<i className="material-icons">close</i>
						<span>Close</span>
					</p>
				</div>
				<div
					className="game-icon game-expand"
					title="Expand"
					onClick={this.props.t_Expand}
				>
					<i className="material-icons">expand_more</i>
				</div>
				
				<Team team={m.home} />
				
				<div className="game-break">
					<hr />
					<p>VS</p>
					<hr />
				</div>
				
				<Team team={m.away} />
				
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
}

export default GameInfo