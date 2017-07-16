// Import React
import React from 'react'
import ReactDOM from 'react-dom'

// Import Components
import Banner from './components/banner'
import Header from './components/header'
import Games from './components/games'
import Footer from './components/footer'

// Import Data
import infoObj from './data/info'

// Import CSS Librarys
import 'normalize.css/normalize.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'

// Import CSS
import './index.css'

// Website Structure Component
const Index = ({ info }) => {
	return (
		<div className="index">

			{ info.dev ? null : <Banner text={info.banner} /> }

			<Header
				title={info.header.title}
				version={info.version}
				subtitle={info.header.subtitle} />

			<Games
				apiKey={info.apiKey}
				date={info.date} />
			
			<Footer
				title={info.footer.title} />

		</div>
	)
}

// Render to DOM
ReactDOM.render(
  <Index info={infoObj} />,
  document.getElementById('root')
)
