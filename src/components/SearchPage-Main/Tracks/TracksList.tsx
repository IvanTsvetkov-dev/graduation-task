import React, { useEffect, useState } from 'react'
import {
	fetchSearchData,
	fetchTrackDetail,
	msToMinutesSeconds,
} from '../../../server/script'
import alt_photo from '../alt-photo.webp'

interface ITrackItem {
	imgSrc: string
	trackName: string
	trackLink: string
	authorName: string
	authorLink: string
	duration: string
}

interface ITrackListProps {
	query: string
}

export const TrackList: React.FC<ITrackListProps> = ({ query }) => {
	const [tracks, setTracks] = useState<ITrackItem[]>([])

	useEffect(() => {
		if (!query) return

		fetchSearchData({
			method: 'track.search',
			paramName: 'track',
			paramValue: query,
			limit: '8',
		})
			.then(async data => {
				const tracksList = data?.results?.trackmatches?.track || []
				const trackItems: ITrackItem[] = []

				await Promise.all(
					tracksList.map(async (track: any) => {
						try {
							const detail = await fetchTrackDetail(track.name, track.artist)
							trackItems.push({
								imgSrc: track.image[2]['#text'] || alt_photo,
								trackName: track.name,
								trackLink: track.url,
								authorName: track.artist,
								authorLink: detail.artist?.url || '#',
								duration: msToMinutesSeconds(Number(detail.duration)),
							})
						} catch (e) {
							console.error(`Error fetching detail for ${track.name}`, e)
							trackItems.push({
								imgSrc:
									track.image[2]['#text'] || '../public/img/alt-photo.webp',
								trackName: track.name,
								trackLink: track.url,
								authorName: track.artist,
								authorLink: '#',
								duration: '0:00',
							})
						}
					})
				)

				setTracks(trackItems)
			})
			.catch(err => {
				console.log(String(err))
			})
	}, [query])

	if (tracks.length === 0) return <p>No tracks found.</p>

	return (
		<table className='tracks__charts'>
			<thead className='tracks__header'>
				<tr></tr>
			</thead>
			<tbody className='tracks__body'>
				{tracks.map((track, index) => (
					<tr key={index} className='tracks__tr'>
						<td className='tracks__elem tracks__play'>
							<a className='icon-play'></a>
						</td>
						<td className='tracks__elem tracks__image'>
							<img
								className='tracks__image-img'
								src={track.imgSrc}
								alt={track.authorName || 'Track image'}
								onError={e => {
									;(e.target as HTMLImageElement).onerror = null
									;(e.target as HTMLImageElement).src =
										'../public/img/alt-photo.webp'
								}}
							/>
						</td>
						<td className='tracks__elem tracks__like'>
							<a className='icon-heart-empty'></a>
						</td>
						<td className='tracks__elem tracks__name'>
							<a href={track.trackLink} className='tracks__name-link'>
								{track.trackName}
							</a>
						</td>
						<td className='tracks__elem tracks__author'>
							<a href={track.authorLink} className='tracks__author-link'>
								{track.authorName}
							</a>
						</td>
						<td className='tracks__elem tracks__duration'>{track.duration}</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}
