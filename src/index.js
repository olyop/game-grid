import React from 'react'
import ReactDOM from 'react-dom'

// Import CSS
import 'normalize.css/normalize.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
import './index.css'

// Import App
import Main from './components/main'

// Common Data
const daysWeek = [
	{ day: 'Sunday', abbr: 'Sun' },
	{ day: 'Monday', abbr: 'Mon' },
	{ day: 'Tuesday', abbr: 'Tue' },
	{ day: 'Wednesday', abbr: 'Wed' },
	{ day: 'Thursday', abbr: 'Thu' },
	{ day: 'Friday', abbr: 'Fri' },
	{ day: 'Saturday', abbr: 'Sat' },
	{ day: 'Sunday', abbr: 'Sun' },
];
const monthsYear = [
	{ month: 'Januray', abbr: 'Jan' },
	{ month: 'Feburay', abbr: 'Feb' },
	{ month: 'March', abbr: 'Mar' },
	{ month: 'April', abbr: 'Apr' },
	{ month: 'May', abbr: 'May' },
	{ month: 'Junes', abbr: 'Jun' },
	{ month: 'July', abbr: 'Jul' },
	{ month: 'August', abbr: 'Aug' },
	{ month: 'September', abbr: 'Sep' },
	{ month: 'October', abbr: 'Oct' },
	{ month: 'November', abbr: 'Nov' },
	{ month: 'December', abbr: 'Dec' }
];
const apiKey = {
	'Ocp-Apim-Subscription-Key': '746cd5dcdaed4053b5431d3ee451005a'
}
const globalDate = new Date();

let globalYear = globalDate.getFullYear,
		globalMonth = monthsYear[globalDate.getMonth()],
		globalDay = globalDate.getDate() - 1

const date = new Date(globalYear + ' ' + globalMonth + ' ' + globalDay)

// Main App
class App extends React.Component {
	render() {
		return (
			
			<Main
				apiKey={apiKey}
				date={date}
				daysWeek={daysWeek}	
				monthsYear={monthsYear}
			/>
			
		)
	}
}

// Render to DOM
ReactDOM.render(
  <App />,
  document.getElementById('root')
)
