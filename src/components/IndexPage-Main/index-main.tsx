import { AuthorSection } from './Authors-Section/authors-section'
import { TracksSection } from './Tracks-Section/tracks-section'

export const IndexMain = () => {
	return (
		<main className='main'>
			<section className='authors-section'>
				<h1 className='header-1 text-center'>Music</h1>
				<h4 className='header-4 text-center header--short-underline'>
					Hot right now
				</h4>
				<AuthorSection />
			</section>
			<section className='tracks-section mb-1'>
				<h4 className='header-4 text-center header--short-underline'>
					Popular tracks
				</h4>
				<section className='tracks-section_popular-list'>
					<TracksSection />
				</section>
			</section>
		</main>
	)
}
