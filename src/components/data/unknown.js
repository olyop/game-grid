const unknownPlayer = {
	info: {
		PhotoUrl: './media/unknown.jpg',
		PlayerID: 'unknown',
		FirstName: 'Cannot Load',
		LastName: 'Player',
		Jersey: '0'
	},
	stats: {
		Games: 10,
		Points: 10,
		Assists: 10,
		Rebounds: 10,
		Steals: 10
	}
}

const topPlayersObj = [
	{ info: null, stats: null },
	{ info: null, stats: null },
	{ info: null, stats: null }
]

export { unknownPlayer, topPlayersObj }