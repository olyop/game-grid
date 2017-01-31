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

const findDateString = (date) => {

	let nowYear = String(date.getFullYear()),
			nowMonth = String(monthsYear[date.getMonth()].abbr),
			nowDate = String(date.getDate() - 1) // -1 for American Time Zone Diff

	return nowYear + '-' + nowMonth + '-' + nowDate
}

export { daysWeek, monthsYear, findDateString }