import React from 'react'
import '../css/main.css'
import Header from './header'
import Games from './games'

// Common Data
const gApiKey = { 'Ocp-Apim-Subscription-Key': '746cd5dcdaed4053b5431d3ee451005a' }
const gDate = new Date()
const gDaysWeek = [
	{ day: 'Sunday', abbr: 'Sun' },
	{ day: 'Monday', abbr: 'Mon' },
	{ day: 'Tuesday', abbr: 'Tue' },
	{ day: 'Wednesday', abbr: 'Wed' },
	{ day: 'Thursday', abbr: 'Thu' },
	{ day: 'Friday', abbr: 'Fri' },
	{ day: 'Saturday', abbr: 'Sat' },
	{ day: 'Sunday', abbr: 'Sun' },
];
const gMonthsYear = [
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

class Main extends React.Component {
	render() {
		return (
			<div className="main">
				
				<Header />
				
				<Games
					apiKey={gApiKey}
					date={gDate}
					daysWeek={gDaysWeek}
					monthsYear={gMonthsYear} />
				
			</div>
		)
	}
}

export default Main