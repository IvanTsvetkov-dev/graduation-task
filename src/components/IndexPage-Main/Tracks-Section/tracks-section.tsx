import { useEffect, useState } from 'react'
import { fetchTopData, fetchTopAuthorsTags } from '../../../server/script'
import { TrackCard } from './track-card'

interface IGenre {
	url: string
	name: string
	count: number
}

interface ITrack {
	src: string
	url: string
	name: string
	authorUrl: string
	authorName: string
	genre: IGenre[]
}

export const TracksSection = () => {
	const [tracks, setTracks] = useState<ITrack[]>([])

	useEffect(() => {
		fetchTopData({ method: 'chart.gettoptracks', limit: 18 })
			.then(async data => {
				try {
					const tracksData = data.tracks.track
					const tracksWithGenres: ITrack[] = await Promise.all(
						tracksData.map(async (track: any) => {
							try {
								const topGenres = await fetchTopAuthorsTags(track.artist.name)
								return {
									src: track.image[2]['#text'],
									url: track.url,
									name: track.name,
									authorUrl: track.artist.url,
									authorName: track.artist.name,
									genre: topGenres,
								}
							} catch (e) {
								console.error(e)
								return {
									src: track.image[2]['#text'],
									url: track.url,
									name: track.name,
									authorUrl: track.artist.url,
									authorName: track.artist.name,
									genre: [],
								}
							}
						})
					)
					setTracks(tracksWithGenres)
				} catch (e) {
					console.error(e)
				}
			})
			.catch(err => {
				console.error(err)
			})
	}, [])
	return (
		<>
			{tracks.map(track => (
				<TrackCard
					key={track.url}
					src={track.src}
					url={track.url}
					name={track.name}
					authorUrl={track.authorUrl}
					authorName={track.authorName}
					genre={track.genre}
				/>
			))}
		</>
	)
}
