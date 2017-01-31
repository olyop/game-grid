// Import React
import React from 'react'
import ReactDOM from 'react-dom'

// Import Components
import Banner from './components/banner'
import Header from './components/header'
import Games from './components/games'

// Import Data
import infoObj from './data/info'

// Import CSS
import 'normalize.css/normalize.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
import './index.css'

// Website Structure Component
const Index = ({ info }) => {
	return (

		<div className="index">

			<Banner
				dev={info.dev}
				text={info.banner} />

			<Header
				title={info.header.title}
				version={info.version}
				subtitle={info.header.subtitle} />

			<Games
				apiKey={info.apiKey}
				date={info.date} />

		</div>

	)
}

// Render to DOM
ReactDOM.render(
  <Index info={infoObj} />,
  document.getElementById('root')
)
