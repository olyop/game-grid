import React from 'react'
import '../css/games-info.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Toggle from 'material-ui/Toggle'

class GamesInfo extends React.Component {
	
	constructor(props) {
		super(props)
		this.state = {
			toggle: this.props.spoiler
		}
		this.handleClick = this.handleClick.bind(this)
	}
	
	handleClick() {
		
		this.props.spoilerToggle(this.state.toggle)
		
		this.setState(prevState => ({
      toggle: !prevState.toggle
    }));
	}
	
	render() {
		return (
			<div id="games-info">
				<div className='container'>
					<div className="col-sm-6 games-info-left">
						{this.props.numGames + ' games on today'}
					</div>
					<div className="col-sm-6 games-info-right">
						<div className="games-info-right-inner">
							<MuiThemeProvider>
								<Toggle
									label="Spoliers"
									labelPosition="left"
									defaultToggled={this.state.toggle}
									onClick={this.handleClick}
								/>
							</MuiThemeProvider>
						</div>
					</div>
				</div>
			</div>
		)
	}
	
}

export default GamesInfo