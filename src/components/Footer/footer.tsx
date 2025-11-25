export const Footer = () => {
	return (
		<footer className='footer mt-1'>
			<div className='footer__menu'>
				<div className='footer__menu-column'>
					<h2 className='footer__menu-list-subheader'>Company</h2>
					<ul className='footer__menu-list'>
						<li className='footer__menu-list-item'>
							<a href='#' className='footer__menu-list-link'>
								About Last.fm
							</a>
						</li>
						<li className='footer__menu-list-item'>
							<a href='#' className='footer__menu-list-link'>
								Contact Us
							</a>
						</li>
						<li className='footer__menu-list-item'>
							<a href='#' className='footer__menu-list-link'>
								Jobs
							</a>
						</li>
					</ul>
				</div>
				<div className='footer__menu-column'>
					<h2 className='footer__menu-list-subheader'>Help</h2>
					<ul className='footer__menu-list'>
						<li className='footer__menu-list-item'>
							<a href='#' className='footer__menu-list-link'>
								Track My Music
							</a>
						</li>
						<li className='footer__menu-list-item'>
							<a href='#' className='footer__menu-list-link'>
								Community Support
							</a>
						</li>
						<li className='footer__menu-list-item'>
							<a href='#' className='footer__menu-list-link'>
								Community Guidelines
							</a>
						</li>
						<li className='footer__menu-list-item'>
							<a href='#' className='footer__menu-list-link'>
								Help
							</a>
						</li>
					</ul>
				</div>
				<div className='footer__menu-column'>
					<h2 className='footer__menu-list-subheader'>Goodies</h2>
					<ul className='footer__menu-list'>
						<li className='footer__menu-list-item'>
							<a href='#' className='footer__menu-list-link'>
								Download Scrobbler
							</a>
						</li>
						<li className='footer__menu-list-item'>
							<a href='#' className='footer__menu-list-link'>
								Developer API
							</a>
						</li>
						<li className='footer__menu-list-item'>
							<a href='#' className='footer__menu-list-link'>
								Free Music Downloads
							</a>
						</li>
						<li className='footer__menu-list-item'>
							<a href='#' className='footer__menu-list-link'>
								Merchandise
							</a>
						</li>
					</ul>
				</div>
				<div className='footer__menu-column'>
					<h2 className='footer__menu-list-subheader'>Account</h2>
					<ul className='footer__menu-list'>
						<li className='footer__menu-list-item'>
							<a href='#' className='footer__menu-list-link'>
								Inbox
							</a>
						</li>
						<li className='footer__menu-list-item'>
							<a href='#' className='footer__menu-list-link'>
								Settings
							</a>
						</li>
						<li className='footer__menu-list-item'>
							<a href='#' className='footer__menu-list-link'>
								Last.fm Pro
							</a>
						</li>
						<li className='footer__menu-list-item'>
							<a href='#' className='footer__menu-list-link'>
								Logout
							</a>
						</li>
					</ul>
				</div>
				<div className='footer__menu-column'>
					<h2 className='footer__menu-list-subheader'>Follow us</h2>
					<ul className='footer__menu-list'>
						<li className='footer__menu-list-item'>
							<a href='#' className='footer__menu-list-link'>
								Facebook
							</a>
						</li>
						<li className='footer__menu-list-item'>
							<a href='#' className='footer__menu-list-link'>
								Twitter
							</a>
						</li>
						<li className='footer__menu-list-item'>
							<a href='#' className='footer__menu-list-link'>
								Instagram
							</a>
						</li>
						<li className='footer__menu-list-item'>
							<a href='#' className='footer__menu-list-link'>
								Youtube
							</a>
						</li>
					</ul>
				</div>
			</div>
			<hr className='footer__underline' />
			<div className='footer__bottom'>
				<div className='footer__inner'>
					<ul className='footer__languages-list'>
						<li className='footer__languages-list-item'>English</li>
						<li className='footer__languages-list-item'>Deutsch</li>
						<li className='footer__languages-list-item'>Español</li>
						<li className='footer__languages-list-item'>Français</li>
						<li className='footer__languages-list-item'>Italiano</li>
						<li className='footer__languages-list-item'>日本語</li>
						<li className='footer__languages-list-item'>Polski</li>
						<li className='footer__languages-list-item'>Português</li>
						<li className='footer__languages-list-item'>Русский </li>
						<li className='footer__languages-list-item'>Svenska </li>
						<li className='footer__languages-list-item'>Türkçe </li>
						<li className='footer__languages-list-item'>简体中文</li>
					</ul>
					<p className='footer__time-zone'>
						<span className='footer__time-zone-text'>Time zone:</span>{' '}
						Europe/Moscow
					</p>
					<div className='footer__copyright mb-5'>
						<a
							href='http://www.cbsinteractive.com/'
							className='footer__copyright-link'
						>
							CBS Interactive
						</a>
						<span className='footer__copyright-text'>
							© 2025 Last.fm Ltd. All rights reserved
						</span>
						<ul className='footer__copyright-list'>
							<li className='footer__copyright-item'>
								<a
									href='https://www.last.fm/legal/terms'
									className='footer__copyright-link'
								>
									Terms of use
								</a>
							</li>
							<li className='footer__copyright-item'>
								<a
									href='https://www.last.fm/legal/terms'
									className='footer__copyright-link'
								>
									Privacy police
								</a>
							</li>
							<li className='footer__copyright-item'>
								<a
									href='https://www.last.fm/legal/terms'
									className='footer__copyright-link'
								>
									Legal Policies
								</a>
							</li>
							<li className='footer__copyright-item'>
								<a
									href='https://www.last.fm/legal/terms'
									className='footer__copyright-link'
								>
									Cookie Details
								</a>
							</li>
							<li className='footer__copyright-item'>
								<a
									href='https://www.last.fm/legal/terms'
									className='footer__copyright-link'
								>
									Jobs at Paramount
								</a>
							</li>
							<li className='footer__copyright-item'>
								<a
									href='https://www.last.fm/legal/terms'
									className='footer__copyright-link'
								>
									Last.fm Music
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</footer>
	)
}
