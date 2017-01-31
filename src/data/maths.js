const hexToRgba = (hex, opacity) => {
	if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
		let c = hex.substring(1).split('')
		if(c.length === 3){
			c = [c[0], c[0], c[1], c[1], c[2], c[2]]
		}
		c = '0x'+c.join('');
			return 'rgba(' + [(c>>16)&255, (c>>8)&255, c&255].join(',') + ',' + opacity + ')' 
	}
	return 'rgba(0,0,0,' + opacity + ')'
}

const colorLuminance = (hex, lum) => {
	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) { hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2]; }
	lum = lum || 0;

	// convert to decimal and change luminosity
	let rgb = "#", c, i
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i*2,2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00"+c).substr(c.length);
	}

	return rgb
}

export { hexToRgba, colorLuminance }
