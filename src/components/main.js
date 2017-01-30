import React from 'react'
import Banner from './banner'
import Header from './header'
import Games from './games'
import infoObj from './data/info'

import '../css/main.css'

// Common Data
const gApiKey = { 'Ocp-Apim-Subscription-Key': '746cd5dcdaed4053b5431d3ee451005a' }
const gDate = new Date()

class Main extends React.Component {
	render() {
		return (
			<div className="main">
				
				<Banner
					text={infoObj.banner} />
				
				<Header
					title={infoObj.header.title}
					version={infoObj.version}
					subtitle={infoObj.header.subtitle} />
				
				<Games
					apiKey={gApiKey}
					date={gDate} />
				
			</div>
		)
	}
}

export default Main