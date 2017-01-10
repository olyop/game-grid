import React from 'react'

class GameInfo extends React.Component {
	render() {
		
		let m = this.props.m
		
		return (
			<div className="game-inner" style={m.starInner}>
				<div
					className="game-icon game-star"
					title="Star"
					onClick={this.props.toggleStar}
					style={m.starStyle}
				>
					<i className="material-icons">{m.starType}</i>
				</div>
				<div
					className="game-icon game-more"
					title="More"
					onClick={this.props.toggleMenu}
				>
					<i className="material-icons">more_vert</i>
				</div>
				<div className="game-more-menu more-menu" style={m.menuStyle}>
					<p
						className="close-menu"
						onClick={this.props.toggleMenu}
					>
						<i className="material-icons">close</i>
						<span>Close</span>
					</p>
					<hr />
					<p>
						<i className="material-icons">watch_later</i>
						<span>Watch Later</span>
					</p>
					<p>
						<a
							href="https://github.com/olyop/game-grid/issues/"
							target="_blank"
						>
							<i className="material-icons">bug_report</i>
							<span>Report Bug</span>
						</a>
					</p>
					<p>
						<i className="material-icons">visibility</i>
						<span>Visibility</span>
					</p>
					<p>
						<i className="material-icons">settings</i>
						<span>Settings</span>
					</p>
					<p>
						<a
							href="https://github.com/olyop/game-grid/"
							target="_blank"
						>
							<i className="material-icons">help</i>
							<span>Help</span>
						</a>
					</p>
					<p onClick={this.props.toggleStar}>
						<i className="material-icons">{m.starType}</i>
						<span>Star</span>
					</p>
					<hr />
					<p>
						<a
							href={m.nbaWebsiteUrl + m.homeTeam.Name.toLowerCase() + '/'}
							title={'Visit the ' + m.homeTeam.Name + ' website'}
							target="_blank"
						>
							<i className="material-icons">open_in_new</i>
							<span>{m.homeTeam.Name + '.com'}</span>
						</a>
					</p>
					<p>
						<a
							href={m.nbaWebsiteUrl + m.awayTeam.Name.toLowerCase() + '/'}
							title={'Visit the ' + m.awayTeam.Name + ' website'}
							target="_blank"
						>
							<i className="material-icons">open_in_new</i>
							<span>{m.awayTeam.Name + '.com'}</span>
						</a>
					</p>
				</div>
				<div
					className="game-icon game-share"
					title="Share"
					onClick={this.props.toggleShare}
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
						onClick={this.props.toggleShare}
					>
						<i className="material-icons">close</i>
						<span>Close</span>
					</p>
				</div>
				<div
					className="game-icon game-expand"
					title="Expand"
					onClick={this.props.toggleExpand}
				>
					<i className="material-icons">expand_more</i>
				</div>
				<div className="game-team">
					<img
						src={m.teamLogoUrl + m.homeTeam.Key.toLowerCase() + '.svg'}
						alt={m.homeTeam.Name} 
					/>
					<p className="game-team-score" style={m.homeScoreDisplay}>
						<span style={m.homeScoreStyle}>{m.homeScore}</span>
					</p>
					<div className="game-team-text">
						<h4>{m.homeTeam.City}</h4>
						<h3 style={m.homeColor}>{m.homeTeam.Name}</h3>
						<p>{m.homeTeamRecord}</p>
					</div>
				</div>
				<div className="game-break">
					<hr />
					<p>VS</p>
					<hr />
				</div>
				<div className="game-team">
					<img
						src={m.teamLogoUrl + m.awayTeam.Key.toLowerCase() + '.svg'}
						alt={m.awayTeam.Name} 
					/>
					<p className="game-team-score" style={m.awayScoreDisplay}>
						<span style={m.awayScoreStyle}>{m.awayScore}</span>
					</p>
					<div className="game-team-text">
						<h4>{m.awayTeam.City}</h4>
						<h3 style={m.awayColor}>{m.awayTeam.Name}</h3>
						<p>{m.awayTeamRecord}</p>
					</div>
				</div>
				<div className="game-break">
					<hr />
					<p>{m.gameBreak}</p>
					<hr />
				</div>
				<div className="game-header">
					<p>
						{m.headerLeft}
						{' '}&#8212;{' '}
						{m.headerRight}
					</p>
				</div>
			</div>
		)
	}
}

export default GameInfo