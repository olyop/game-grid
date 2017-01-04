import React from 'react'
import '../css/calender.css'
		
// eslint-disable-next-line
Date.prototype.addDays = function(days) {
	var dat = new Date(this.valueOf())
	dat.setDate(dat.getDate() + days)
	return dat
}

class CalenderDay extends React.Component {
	render() {
		
		let dayClass = 'calender-day'
		if (this.props.active === true) { dayClass += ' active' }

		return (
			<div
				className={dayClass}
			>
				<p>
					<span className="calender-day-week">{this.props.day.day}</span>
					{' ' + this.props.day.month + '. ' + this.props.day.date}
				</p>
			</div>
		)
	}
}

class Calender extends React.Component {
	
	constructor(props) {
		super(props)
		this.state = {
			dayObj: [
				{ day: null, month: null, date: null },
				{ day: null, month: null, date: null },
				{ day: null, month: null, date: null },
				{ day: null, month: null, date: null },
				{ day: null, month: null, date: null },
				{ day: null, month: null, date: null },
				{ day: null, month: null, date: null }
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
			
			this.setState({ dayObj: arr })
		}
		
		// DEV
		console.log({calender: this.state.dayObj})
	}
	
	render() {
		
		const calenderList = this.state.dayObj.map((day, index) => {
					
			if (day.date === this.state.d.getDate()) {
				return (
					<CalenderDay
						day={day}
						key={index}
						active={true}
					/>
				)
			} else {
				return (
					<CalenderDay
						day={day}
						key={index}
						active={false}
					/>
				)
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