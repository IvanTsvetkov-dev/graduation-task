interface IAuthorCardProps {
	imgSrc: string
	authorName: string
	authorUrl: string
	genre: IGenre[]
}
interface IGenre {
	url: string
	name: string
	count: number
}

export const AuthorCard = (props: IAuthorCardProps) => {
	return (
		<article className='author-card'>
			<img
				className='author-card__img-rounded-half'
				src={props.imgSrc}
				alt={props.authorName}
				loading='lazy'
			/>
			<a href={props.authorUrl} className='author-card__author-name'>
				{props.authorName}
			</a>
			<ul className='genre-list genre-list--ps-5'>
				{props.genre.map(genre => (
					<li key={genre.url} className='genre-list_item'>
						<a href={genre.url} className='genre-list_item-link'>
							{genre.name.toLowerCase()}
						</a>
					</li>
				))}
			</ul>
		</article>
	)
}
