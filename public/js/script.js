const API_KEY = '18c671e0779ec3b93335884680854000'
const BASE_URL = 'http://ws.audioscrobbler.com/2.0/'

/* Save links for dom elements */
const artistsList = document.querySelector('.authors-section__authors-list');
const tracksListLink = document.querySelector('.tracks-section_popular-list')

/* First page. Top Artists */
async function fetchTopAuthors(){
	try{
		const response = await fetch(`${BASE_URL}?method=chart.gettopartists&api_key=${API_KEY}&format=json&limit=12`);
		if (response.status != 200)
			throw new Error(`Error! Http code: ${response.status}`);
		const data = await response.json();
		if (!data.artists || !data.artists.artist) {
			throw new Error(`There isn't field artists/artits`);
		}
		return data.artists.artist;
	}catch(e){
		throw Error(e);
	}
}
async function fetchTopAuthorsTags(artistName){
	try{
		const response = await fetch(`${BASE_URL}?method=artist.gettoptags&artist=${artistName}&api_key=${API_KEY}&format=json`);
		if (response.status != 200)
			throw new Error(`Error! Http code: ${response.status}`);
		const data = await response.json();
		if(!data.toptags || !data.toptags.tag){
			throw new Error(`There isn't field toptags/tag`);
		}
		return data.toptags.tag.slice(0, 3);
	}catch(e){
		throw Error(e);
	}
}
async function fetchTopTracks(){
	try{
		const response = await fetch(`${BASE_URL}?method=chart.gettoptracks&api_key=${API_KEY}&format=json&limit=18`)
		if (response.status != 200)
			throw new Error(`Error! Http code: ${response.status}`)
		const data = await response.json()
		if (!data.tracks || !data.tracks.track) {
			throw new Error(`There isn't field tracks/track`)
		}
		return data.tracks.track;
	}catch(e){
		throw Error(e);
	}
}

function createAuthorCard({ imgSrc, authorName, authorUrl }) {
	const article = document.createElement('article');
	article.classList.add('author-card');

	const img = document.createElement('img');
	img.classList.add('author-card__img-rounded-half');
	img.src = imgSrc;
	img.alt = '...';
	img.loading = 'lazy';
	article.appendChild(img);

	const authorLink = document.createElement('a');
	authorLink.href = authorUrl;
	authorLink.classList.add('author-card__author-name');
	authorLink.textContent = authorName;
	article.appendChild(authorLink);

	const ul = document.createElement('ul');
	ul.classList.add('genre-list', 'genre-list--ps-5');

	fetchTopAuthorsTags(authorName)
		.then(topTags =>{
			topTags.forEach(genre => {
				const li = document.createElement('li');
				li.classList.add('genre-list_item');

				const a = document.createElement('a');
				a.classList.add('genre-list_item-link');
				a.href = genre.url;
				a.textContent = genre.name.toLowerCase();

				li.appendChild(a);
				ul.appendChild(li);
			})
		})
		.catch()
	article.appendChild(ul);
	return article;
}

function createTrackCard({track: {trackName, trackSrc, trackUrl}, author: {authorName, authorUrl}}){
	const article = document.createElement('article')
	article.classList.add('track-card')

	const img = document.createElement('img')
	img.src = trackSrc
	img.alt = '...'
	img.width = 70
	img.height = 70
	article.appendChild(img)

	const infoDiv = document.createElement('div')
	infoDiv.classList.add('track-card__info')

	const trackLink = document.createElement('a')
	trackLink.href = trackUrl
	trackLink.classList.add('author-card__track-name')
	trackLink.textContent = trackName
	infoDiv.appendChild(trackLink)

	const authorLink = document.createElement('a')
	authorLink.href = authorUrl
	authorLink.classList.add('author-card__track-author')
	authorLink.textContent = authorName
	infoDiv.appendChild(authorLink)

	const ul = document.createElement('ul')
	ul.classList.add('genre-list')

	fetchTopAuthorsTags(authorName)
		.then(topTags => {
			topTags.forEach(genre => {
				const li = document.createElement('li')
				li.classList.add('genre-list_item')

				const a = document.createElement('a')
				a.classList.add('genre-list_item-link')
				a.href = genre.url
				a.textContent = genre.name.toLowerCase()

				li.appendChild(a)
				ul.appendChild(li)
			})
		})

	infoDiv.appendChild(ul)
	article.appendChild(infoDiv)

	return article
}

fetchTopAuthors()
	.then(artists => {
		console.log(artists[0])
		for (let i = 0; i < artists.length; i++) {
			const authorCard = createAuthorCard({
				imgSrc: artists[i].image[2]['#text'],
				authorName: artists[i].name,
				authorUrl: artists[i].url
			})
			artistsList.append(authorCard)
		}
	})
	.catch(err => console.error(err));

fetchTopTracks()
	.then(tracks =>{
		console.log(tracks);
		for(let i = 0; i < tracks.length; i++){
			const trackCard = createTrackCard({
				track: {
					trackName: tracks[i].name,
					trackSrc: tracks[i].image[2]['#text'],
					trackUrl: tracks[i].url
				},
				author: {
					authorName: tracks[i].artist.name,
					authorUrl: tracks[i].artist.url
				}
			})
			tracksListLink.append(trackCard)
		}
	})