import React from 'react'
import '../css/main.css'
import Header from './header.js'
import Games from './games.js'

const apiKey = {
	'Ocp-Apim-Subscription-Key': '746cd5dcdaed4053b5431d3ee451005a'
} 

export default class Main extends React.Component {
	render() {
		return (
			<div className="main">
				
				<Header />
				<Games apiKey={apiKey}/>
				
			</div>
		)
	}
}