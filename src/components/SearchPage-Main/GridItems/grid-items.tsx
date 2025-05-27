import { GridItem } from './grid-item'

interface IGridItem {
	imgSrc: string
	headerText: string
	headerLink: string
	subtext: string
}

interface GridItemsProps {
	items: IGridItem[]
}

export const GridItems = (props: GridItemsProps) => {
	return (
		<ul className='grid-items'>
			{props.items.map((item, index) => (
				<GridItem
					key={index}
					imgSrc={item.imgSrc}
					headerText={item.headerText}
					headerLink={item.headerLink}
					subtext={item.subtext}
				/>
			))}
		</ul>
	)
}
