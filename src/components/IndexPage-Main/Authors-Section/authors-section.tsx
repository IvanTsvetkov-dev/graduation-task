import { useEffect, useState } from 'react'
import { fetchTopAuthorsTags, fetchTopData } from '../../../server/script'
import { AuthorCard } from './author-card'

interface IArtist {
	name: string
	url: string
	image: { '#text': string }[]
	genre: IGenre[]
}

interface IGenre {
	url: string
	name: string
	count: number
}

export const AuthorSection = () => {
	const [artists, setArtists] = useState<IArtist[]>([])

	useEffect(() => {
		fetchTopData({ method: 'chart.gettopartists', limit: 12 })
			.then(async data => {
				try {
					const artistsData: IArtist[] = data.artists.artist

					const artistsWithGenres = await Promise.all(
						artistsData.map(async artist => {
							try {
								const topGenres = await fetchTopAuthorsTags(artist.name)
								return { ...artist, genre: topGenres }
							} catch (e) {
								console.error(`Ошибка загрузки жанров для ${artist.name}`, e)
								return { ...artist, genre: [] }
							}
						})
					)

					setArtists(artistsWithGenres)
				} catch (e) {
					console.error(e)
				}
			})
			.catch(err => {
				console.error(err)
			})
	}, [])

	return (
		<section className='authors-section__authors-list'>
			{artists.map(artist => (
				<AuthorCard
					key={artist.url}
					imgSrc={artist.image[2]['#text'] || ''}
					authorName={artist.name}
					authorUrl={artist.url}
					genre={artist.genre}
				/>
			))}
		</section>
	)
}
