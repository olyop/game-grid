// Import React
import React from 'react'

const GameMoreShare = ({ t_Share }) => {
	return (
		<div className="game-share-menu more-menu">
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
				onClick={t_Share}
			>
				<i className="material-icons">close</i>
				<span>Close</span>
			</p>
		</div>
	)
}

export default GameMoreShare