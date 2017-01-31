import React from 'react'

import '../../css/games-info.css'

class GamesInfo extends React.Component {
	
	constructor(props) {
		super(props)
		this.state = {
			toggleScores: false
		}
		this.handleClick = this.handleClick.bind(this)
	}
	
	handleClick() {
		this.setState(prevState => ({ toggleScores: !prevState.toggleScores }))
		
		this.props.toggleScores(this.state.toggleScores)
	}
	
	componentDidMount() {
		this.handleClick()
	}
	
	render() {
		return (
			<div id="games-info">
				<div className="container-fluid">
					<div className="col-sm-6 games-info-left">
						{this.props.numGames + ' games on today'}
					</div>
					<div className="col-sm-6 games-info-right">
						<div className="games-info-right-inner">
							
							<button className="games-info-button" onClick={this.handleClick.bind(this)}>
								<span>Scores</span>
								<i className="material-icons">{this.state.toggleScores ? 'visibility' : 'visibility_off'}</i>
							</button>
							
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default GamesInfo