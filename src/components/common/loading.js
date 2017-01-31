import React from 'react'
import loadingImg from '../../../public/media/loading.svg'

class Loading extends React.Component {
	render() {
		return (
			<div className="grid-loading">
				<img src={loadingImg} alt="Loading Svg" />
			</div>
		)
	}
}

export default Loading
