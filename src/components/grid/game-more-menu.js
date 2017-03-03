// Import React
import React from 'react'

// Declare Component
const MoreMenu = ({ m, t_Menu, t_Star }) => {
	return (
		<div className="game-more-menu more-menu">
			<p
				className="close-menu"
				onClick={t_Menu}
			>
				<i className="material-icons">close</i>
				<span>Close</span>
			</p>
			<hr />
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
				<a
					href="https://github.com/olyop/game-grid/"
					target="_blank"
				>
					<i className="material-icons">help</i>
					<span>Help</span>
				</a>
			</p>
			<p onClick={t_Star}>
				<i className="material-icons">{m.starType}</i>
				<span>Star</span>
			</p>
			<hr />
			<p>
				<a
					href={m.nbaWebsiteUrl + m.home.info.Name.toLowerCase() + '/'}
					title={'Visit the ' + m.home.info.Name + ' website'}
					target="_blank"
				>
					<i className="material-icons">open_in_new</i>
					<span>{m.home.info.Name + '.com'}</span>
				</a>
			</p>
			<p>
				<a
					href={m.nbaWebsiteUrl + m.away.info.Name.toLowerCase() + '/'}
					title={'Visit the ' + m.away.info.Name + ' website'}
					target="_blank"
				>
					<i className="material-icons">open_in_new</i>
					<span>{m.away.info.Name + '.com'}</span>
				</a>
			</p>
		</div>
	)
}

export default MoreMenu