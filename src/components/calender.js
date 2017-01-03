import React from 'react'
import '../css/calender.css'

class Calender extends React.Component {
	constructor() {
		super()
		this.dayObj = [
			{ day: null, month: null, date: null, abbr: null },
			{ day: null, month: null, date: null, abbr: null },
			{ day: null, month: null, date: null, abbr: null },
			{ day: null, month: null, date: null, abbr: null },
			{ day: null, month: null, date: null, abbr: null },
			{ day: null, month: null, date: null, abbr: null },
			{ day: null, month: null, date: null, abbr: null }
		];
		this.months = [
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
		this.days = [
			{ day: 'Sunday', abbr: 'Sun' },
			{ day: 'Monday', abbr: 'Mon' },
			{ day: 'Tuesday', abbr: 'Tue' },
			{ day: 'Wednesday', abbr: 'Wed' },
			{ day: 'Thursday', abbr: 'Thu' },
			{ day: 'Friday', abbr: 'Fri' },
			{ day: 'Saturday', abbr: 'Sat' },
			{ day: 'Sunday', abbr: 'Sun' },
		];
	}
	render() {
		
		const d = this.props.date
		
		// eslint-disable-next-line
		Date.prototype.addDays = function(days) {
    	var dat = new Date(this.valueOf())
    	dat.setDate(dat.getDate() + days)
    	return dat
		}
		
		for (var i = 0; i < 7; i++) {
			
			let date = d.addDays(i),
					dat = date.getDate(),
					arr = this.dayObj[i]
			
			arr.day = this.days[date.getDay()].abbr
			arr.month = this.months[date.getMonth()].abbr
			arr.date = dat
			
		}
		
		const calenderList = this.dayObj.map((day, index) => {
			
			let dayString = (
				<p>
					<span className="calender-day-week">{day.day}</span>
					{' ' + day.month + '. ' + day.date}
				</p>
			)
					
			if (day.date === d.getDate()) {
				return <div className="calender-day active" key={index}>{dayString}</div>
			} else {
				return <div className="calender-day" key={index}>{dayString}</div>
			}
		})
		
		return (
			<div className="container" id="calender">
				<div className="calender-inner">
					<div className="calender-dropdown">
						<i className="material-icons">expand_more</i>
						<p>Calender</p>
					</div>
					<div className="calender-main">
						<div className="calender-control calender-control-left">
							<i className="material-icons">keyboard_arrow_left</i>
						</div>
						<div className="calender-days">{calenderList}</div>
						<div className="calender-control calender-control-right">
							<i className="material-icons">keyboard_arrow_right</i>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Calender