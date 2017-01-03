import React from 'react'
import '../css/main.css'
import Header from './header.js'
import Games from './games.js'



class Main extends React.Component {
	render() {
		return (
			<div className="main">
				
				<Header />
				
				<Games
					apiKey={this.props.apiKey}
					daysWeek={this.props.daysWeek}
					monthsYear={this.props.monthsYear}
				/>
				
			</div>
		)
	}
}

export default Main