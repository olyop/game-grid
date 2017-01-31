import React from 'react'
import { daysWeek, monthsYear } from '../data/calender-data'

import '../css/calender.css'

class CalenderDay extends React.Component {

	constructor(props) {
		super(props)
		
		this.state = { active: this.props.active }
	}
	
	handleClick() {
		this.setState(prevState => ({ active: !prevState.active }))
		this.props.onDayClick(this.props.day.dateObj)
	}
	
	render() {
		let dayClass = 'calender-day'
		if (this.state.active === true) { dayClass += ' active' }

		return (
			<div
				className={dayClass}
				onClick={this.handleClick.bind(this)}
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
		
		// eslint-disable-next-line
		Date.prototype.addDays = function(days) {
			var dat = new Date(this.valueOf())
			dat.setDate(dat.getDate() + days)
			return dat
		}
		
		for (var i = 0; i < 7; i++) {
			let date = this.state.d.addDays(i),
					dat = date.getDate(),
					arr = this.state.dayObj
			
			arr[i].day = daysWeek[date.getDay()].abbr
			arr[i].month = monthsYear[date.getMonth()].abbr
			arr[i].date = dat
			arr[i].dateObj = new Date(date)
			
			this.setState({ dayObj: arr })
		}
	}
	
	render() {
		
		const calenderList = this.state.dayObj.map((day, index) => {
			
			let temp = day.date === this.state.d.getDate()
			
			return (
				
				<CalenderDay
					onDayClick={this.props.onDayClick}
					day={day}
					key={index}
					active={temp} />
				
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