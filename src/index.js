import React from 'react'
import ReactDOM from 'react-dom'

// Import CSS
import 'normalize.css/normalize.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
import './index.css'

// Import App
import Main from './components/main'

// Main App
class App extends React.Component {
	render() {
		return (
			
			<Main />
			
		)
	}
}

// Render to DOM
ReactDOM.render(
  <App />,
  document.getElementById('root')
)
