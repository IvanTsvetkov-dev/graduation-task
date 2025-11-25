interface ITrack {
	src: string
	url: string
	name: string
	authorUrl: string
	authorName: string
	genre: IGenre[]
}

interface IGenre {
	url: string
	name: string
	count: number
}
export const TrackCard = (props: ITrack) => {
	return (
		<article className='track-card'>
			<img src={props.src} alt='...' width={70} height={70} loading='lazy' />
			<div className='track-card__info'>
				<a href={props.url} className='author-card__track-name'>
					{props.name}
				</a>
				<a href={props.authorUrl} className='author-card__track-author'>
					{props.authorName}
				</a>
				<ul className='genre-list'>
					{props.genre.map(genre => (
						<li key={genre.url} className='genre-list_item'>
							<a href={genre.url} className='genre-list_item-link'>
								{genre.name.toLowerCase()}
							</a>
						</li>
					))}
				</ul>
			</div>
		</article>
	)
}
