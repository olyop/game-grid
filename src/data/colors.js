import find from 'lodash/find'

const colors = {
	prim: null,
	sec: null,
	grey: (tone) => {
		
		const colors = [
			{ tone: 50, hex: '#FAFAFA' },
			{ tone: 100, hex: '#F5F5F5' },
			{ tone: 200, hex: '#EEEEEE' },
			{ tone: 300, hex: '#E0E0E0' },
			{ tone: 400, hex: '#BDBDBD' },
			{ tone: 500, hex: '#9E9E9E' },
			{ tone: 600, hex: '#757575' },
			{ tone: 700, hex: '#616161' },
			{ tone: 800, hex: '#424242' },
			{ tone: 900, hex: '#212121' }
		]
		
		let temp = find( colors, { tone } ).hex
		
		return temp
		
	}
}

export default colors
