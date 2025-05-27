import { useHistory } from 'react-router-dom'
import logo from './logo_last_fm.png'

export const Header = () => {
	const history = useHistory()

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const formData = new FormData(event.currentTarget)
		const query = formData.get('query')?.toString().trim()

		if (query) {
			history.push(`/search?query=${encodeURIComponent(query)}`)
		}
	}

	return (
		<header className='header header--background-dark'>
			<div className='header__inner'>
				<a className='header__logo logo' href='/'>
					<img
						className='header__image'
						src={logo}
						width='110'
						height='28'
						alt='...'
					/>
				</a>
				<nav className='header__menu'>
					<ul className='header__menu-list'>
						<li className='header__menu-item'>
							<div className='header__wrapper-search'>
								<form
									className='header__form-search form-search'
									onSubmit={handleSubmit}
								>
									<input
										name='query'
										className='form-search__input'
										placeholder='Search for music...'
										type='search'
									/>
									<button
										className='form-search__button icon-search'
										type='submit'
									></button>
								</form>
							</div>
						</li>
						<li className='header__menu-item'>
							<a
								href='#'
								className='header__menu-link header__menu-link--color'
							>
								Home
							</a>
						</li>
						<li className='header__menu-item'>
							<a
								href='#'
								className='header__menu-link header__menu-link--color'
							>
								Live
							</a>
						</li>
						<li className='header__menu-item'>
							<a
								href='#'
								className='header__menu-link header__menu-link--color'
							>
								Music
							</a>
						</li>
						<li className='header__menu-item'>
							<a
								href='#'
								className='header__menu-link header__menu-link--color'
							>
								Charts
							</a>
						</li>
						<li className='header__menu-item'>
							<a
								href='#'
								className='header__menu-link header__menu-link--color'
							>
								Events
							</a>
						</li>
						<li className='header__menu-item'>
							<a
								href='#'
								className='header__menu-link header__menu-link--color'
							>
								Features
							</a>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	)
}
