// Import React
import React from 'react'

// Import CSS
import './common/materialize/css/materialize.min.css'
import './../css/footer.css'

// Footer Component
const Footer = ({ title }) => {
	return (
		<footer className="page-footer" id="footer">
			<div className="container">
				<div className="row">
					<div className="col l6 s12">
						<h5>Game Grid</h5>
						<p>An unofficial NBA schedule viewer.</p>
					</div>
					<div className="col l4 offset-l2 s12">
						<h5>Links</h5>
						<ul className="footer-links-list">
							<li>
								<a
									href="https://github.com/olyop/game-grid/blob/master/README.md"
									target="_blank"
								>
									About
								</a>
							</li>
							<li>
								<a
									href="https://github.com/olyop/game-grid/"
									target="_blank"
								>
									Github Page
								</a>
							</li>
							<li>
								<a
									href="https://github.com/olyop/game-grid/issues"
									target="_blank"
								>
									Send Feedback
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div className="footer-copyright">
				<div className="container footer-bottom">
				© 2017 Copyright
				<a className="right" href="#">Oliver Plummer</a>
				</div>
			</div>
		</footer>
	)
}

// Export Component
export default Footer