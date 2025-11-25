interface ITrackItem {
	imgSrc: string
	trackName: string
	trackLink: string
	authorName: string
	authorLink: string
	duration: string
}
export const TrackGrid = (props: ITrackItem) => {
	return (
		<tr className='tracks__tr'>
			<td className='tracks__elem tracks__play'>
				<a className='icon-play'></a>
			</td>
			<td className='tracks__elem tracks__image'>
				<img className='tracks__image-img' src={props.imgSrc} alt='...' />
			</td>
			<td className='tracks__elem tracks__like'>
				<a className='icon-heart-empty'></a>
			</td>
			<td className='tracks__elem tracks__name'>
				<a href={props.trackLink} className='tracks__name-link'>
					{props.trackName}
				</a>
			</td>
			<td className='tracks__elem tracks__author'>
				<a href={props.authorLink} className='tracks__author-link'>
					{props.authorName}
				</a>
			</td>
			<td className='tracks__elem tracks__duration'>{props.duration}</td>
		</tr>
	)
}
