import alt_photo from '../alt-photo.webp'
interface IGridItem {
	imgSrc: string
	headerText: string
	headerLink: string
	subtext: string
}
export const GridItem = (props: IGridItem) => {
	return (
		<li className='grid-items__item'>
			<img
				className='grid-items__item-image'
				src={props.imgSrc}
				alt='img'
				onError={e => {
					;(e.target as HTMLImageElement).onerror = null
					;(e.target as HTMLImageElement).src = alt_photo
				}}
			/>
			<div className='grid-items__text-overlay'>
				<a
					href={props.headerLink}
					className='grid-items__text grid-items__header'
				>
					{props.headerText}
				</a>
				<a className='grid-items__text grid-items__subtext grid-items__subtext-author'>
					{props.subtext}
				</a>
			</div>
			<a href={props.headerLink} className='grid-items__link'></a>
		</li>
	)
}
