import React from 'react'
import '../css/calender.css'
		
// eslint-disable-next-line
Date.prototype.addDays = function(days) {
	var dat = new Date(this.valueOf())
	dat.setDate(dat.getDate() + days)
	return dat
}

const CalenderDay = (props) => {
		
		let dayClass = 'calender-day'
		if (props.active === true) { dayClass += ' active' }

		return (
			<div
				className={dayClass}
				onClick={() => props.onDayClick(props.day.dateObj)}
			>
				<p>
					<span className="calender-day-week">{props.day.day}</span>
					{' ' + props.day.month + '. ' + props.day.date}
				</p>
			</div>
		)
}

class Calender extends React.Component {
	
	constructor(props) {
		super(props)
		this.state = {
			dayObj: [
				{ day: null, month: null, date: null, dateObj: null },
				{ day: null, month: null, date: null, dateObj: null },
				{ day: null, month: null, date: null, dateObj: null },
				{ day: null, month: null, date: null, dateObj: null },
				{ day: null, month: null, date: null, dateObj: null },
				{ day: null, month: null, date: null, dateObj: null },
				{ day: null, month: null, date: null, dateObj: null }
			],
			d: this.props.date
		}
	}
	
	componentWillMount() {
		for (var i = 0; i < 7; i++) {
			let date = this.state.d.addDays(i),
					dat = date.getDate(),
					arr = this.state.dayObj
			
			arr[i].day = this.props.daysWeek[date.getDay()].abbr
			arr[i].month = this.props.monthsYear[date.getMonth()].abbr
			arr[i].date = dat
			arr[i].dateObj = new Date(date)
			
			this.setState({ dayObj: arr })
		}
		
		// DEV
		console.log({calender: this.state.dayObj})
	}
	
	render() {
		
		const calenderList = this.state.dayObj.map((day, index) => {
			let temp = false
			if (day.date === this.state.d.getDate()) {
				temp = true
			}
			return (
				<CalenderDay
					onDayClick={this.props.onDayClick}
					day={day}
					key={index}
					active={temp}
				/>
			)
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
						<div className="calender-days">
							{calenderList}
						</div>
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