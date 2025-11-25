import { GridItems } from './GridItems/grid-items'
import React, { useEffect, useState } from 'react'
import { fetchSearchData } from '../../server/script'
import alt_photo from './alt-photo.webp'
import { TrackList } from './Tracks/TracksList'
import { useHistory } from 'react-router-dom'

interface IGridItem {
	imgSrc: string
	headerText: string
	headerLink: string
	subtext: string
}

export const SearchMainPage = () => {
	const params = new URLSearchParams(window.location.search)
	const query = params.get('query') || ''

	const history = useHistory()

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const formData = new FormData(event.currentTarget)
		const query = formData.get('query')?.toString().trim()

		if (query) {
			history.push(`/search?query=${encodeURIComponent(query)}`)
		}
	}

	const [artists, setArtists] = useState<IGridItem[]>([])
	const [albums, setAlbums] = useState<IGridItem[]>([])

	useEffect(() => {
		const fetchArtists = async () => {
			try {
				const data = await fetchSearchData({
					method: 'artist.search',
					paramName: 'artist',
					paramValue: query,
					limit: '8',
				})

				const artistsList = data.results.artistmatches.artist
				console.log(artistsList)
				const artistsItems: IGridItem[] = artistsList.map((artist: any) => ({
					imgSrc: artist.image[2]['#text'],
					headerText: artist.name,
					headerLink: { alt_photo },
					subtext: artist.listeners + ' listeners',
				}))
				setArtists(artistsItems)
			} catch (e) {
				console.error(String(e))
			}
		}
		const fetchAlbums = async () => {
			try {
				const data = await fetchSearchData({
					method: 'album.search',
					paramName: 'album',
					paramValue: query,
					limit: '8',
				})
				const albumsList = data.results.albummatches.album
				const albumsItems: IGridItem[] = albumsList.map((album: any) => ({
					imgSrc: album.image[2]['#text'],
					headerText: album.name,
					headerLink: album.url,
					subtext: album.artist,
				}))
				setAlbums(albumsItems)
			} catch (e) {
				console.error('Error fetching albums:', e)
				setAlbums([])
			}
		}

		fetchArtists()
		fetchAlbums()
	}, [query])

	return (
		<main className='main main--bg-color'>
			<div className='search-section'>
				<div className='search-section__inner'>
					<h1 className='search-section__header header-1s'>
						Search results for "{query}"
					</h1>
					<ul className='search-section__items'>
						<li className='search-section__item'>
							<a href='' className='search-section__link'>
								Top Results
							</a>
						</li>
						<li className='search-section__item'>
							<a href='' className='search-section__link'>
								Artists
							</a>
						</li>
						<li className='search-section__item'>
							<a href='' className='search-section__link'>
								Albums
							</a>
						</li>
						<li className='search-section__item'>
							<a href='' className='search-section__link'>
								Tracks
							</a>
						</li>
					</ul>
				</div>
			</div>
			<div className='main__result-search'>
				<div className='main__left-side'>
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
					<div className='artists'>
						<h2 className='grid-header'>
							<a
								href='https://www.last.fm/search/artists'
								className='grid_header__link'
							>
								Artists
							</a>
						</h2>
						<GridItems items={artists} />
						<p className='more-link'>
							<a className='more-link__link' href=''>
								More artists
							</a>
						</p>
					</div>
					<div className='albums'>
						<h2 className='grid-header'>
							<a
								href='https://www.last.fm/search/albums'
								className='grid_header__link'
							>
								Albums
							</a>
						</h2>
						<GridItems items={albums} />
						<p className='more-link'>
							<a className='more-link__link' href=''>
								More albums
							</a>
						</p>
					</div>
					<div className='tracks'>
						<h2 className='grid-header'>
							<a
								href='https://www.last.fm/search/tracks'
								className='grid_header__link'
							>
								Tracks
							</a>
						</h2>
						<table className='tracks__charts'>
							<thead className='tracks__header'>
								<tr></tr>
							</thead>
							<TrackList query={query} />
						</table>
						<p className='more-link'>
							<a className='more-link__link' href=''>
								More tracks
							</a>
						</p>
					</div>
				</div>
				<div className='right-side'>
					<span className='right-side__text'>Don't want to see ads?</span>
					<a className='right-side__link' href=''>
						Upgrade Now
					</a>
				</div>
			</div>
		</main>
	)
}
