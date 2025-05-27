const API_KEY = '18c671e0779ec3b93335884680854000'
const BASE_URL = 'http://ws.audioscrobbler.com/2.0/'

/* Save links for dom elements */
const searchString = document.querySelector('.search-section__header');
const searchAuthors = document.querySelector('.artists__grid-items');
const searchAlbums = document.querySelector('.albums__grid-items')
const searchTracks = document.querySelector('.tracks__body');

/* Take query parameters */
const params = new URLSearchParams(window.location.search);
const query = params.get('query');

searchString.textContent = `Search results for "${query}"`;

async function fetchSearchAuthors(authorName) {
	try {
		const response = await fetch(
			`${BASE_URL}?method=artist.search&artist=${authorName}&api_key=${API_KEY}&format=json&limit=8`
		);
		if (response.status != 200)
			throw new Error(`Error! Http code: ${response.status}`);
		const data = await response.json();
		if (!data.results.artistmatches.artist) {
			throw new Error(`There isn't fields`)
		}
		return data.results.artistmatches.artist
 	} catch (e) {
		throw Error(e)
	}
}

async function fetchSearchAlbums(albumName){
	try {
		const response = await fetch(
			`${BASE_URL}?method=album.search&album=${albumName}&api_key=${API_KEY}&format=json&limit=6`
		)
		if (response.status != 200)
			throw new Error(`Error! Http code: ${response.status}`);
		const data = await response.json();
		if (!data.results.albummatches.album) {
			throw new Error(`There isn't fields`)
		}
		return data.results.albummatches.album
 	} catch (e) {
		throw Error(e)
	}
}

async function fetchSearchTracks(trackName){
	try {
		const response = await fetch(
			`${BASE_URL}?method=track.search&track=${trackName}&api_key=${API_KEY}&format=json&limit=10`
		)
		if (response.status != 200)
			throw new Error(`Error! Http code: ${response.status}`)
		const data = await response.json()
		if (!data.results.trackmatches.track) {
			throw new Error(`There isn't fields`)
		}
		return data.results.trackmatches.track
	} catch (e) {
		throw Error(e)
	}
}

async function fetchTrackDetail(trackName, artistName){
	try {
		const response = await fetch(
			`${BASE_URL}?method=track.getInfo&api_key=${API_KEY}&artist=${artistName}&track=${trackName}&format=json`
		)
		if (response.status != 200)
			throw new Error(`Error! Http code: ${response.status}`)
		const data = await response.json()
		if (!data.track) {
			throw new Error(`There isn't fields`)
		}
		return data.track
	} catch (e) {
		throw Error(e)
	}
}

function createGridItem({imageSrc, headerText, headerLink, subtext}) {
	const li = document.createElement('li');
	li.className = 'grid-items__item';

	const img = document.createElement('img');
	img.className = 'grid-items__item-image';
	img.src = imageSrc;
	img.alt = '';
	img.onerror = function () {
		this.onerror = null
		this.src = '../public/img/alt-photo.webp'
	}
	li.appendChild(img);

	const textOverlay = document.createElement('div');
	textOverlay.className = 'grid-items__text-overlay';

	const headerLinkEl = document.createElement('a');
	headerLinkEl.className = 'grid-items__text grid-items__header';
	headerLinkEl.href = headerLink;
	headerLinkEl.textContent = headerText;
	textOverlay.appendChild(headerLinkEl);

	const subtextEl = document.createElement('a');
	subtextEl.className = 'grid-items__text grid-items__subtext';
	subtextEl.textContent = subtext;

	textOverlay.appendChild(subtextEl);

	li.appendChild(textOverlay);

	const link = document.createElement('a');
	link.className = 'grid-items__link';
	link.href = headerLink
	li.appendChild(link);

	return li;
}

function createTrackRow({imageSrc, trackName, trackLink, authorName, authorLink, duration}) {
	const tr = document.createElement('tr')
	tr.className = 'tracks__tr'

	const playTd = document.createElement('td')
	playTd.className = 'tracks__elem tracks__play'
	const playLink = document.createElement('a')
	playLink.className = 'icon-play'
	playTd.appendChild(playLink)
	tr.appendChild(playTd)

	const imageTd = document.createElement('td')
	imageTd.className = 'tracks__elem tracks__image'
	const img = document.createElement('img')
	img.className = 'tracks__image-img'
	img.src = imageSrc
	img.alt = authorName || 'Track image'
	img.onerror = function () {
		this.onerror = null
		this.src = '../public/img/alt-photo.webp'
	}
	imageTd.appendChild(img)
	tr.appendChild(imageTd)

	const likeTd = document.createElement('td')
	likeTd.className = 'tracks__elem tracks__like'
	const likeLink = document.createElement('a')
	likeLink.className = 'icon-heart-empty'
	likeTd.appendChild(likeLink)
	tr.appendChild(likeTd)

	const nameTd = document.createElement('td')
	nameTd.className = 'tracks__elem tracks__name'
	const nameLink = document.createElement('a')
	nameLink.className = 'tracks__name-link'
	nameLink.href = trackLink;
	nameLink.textContent = trackName;
	nameTd.appendChild(nameLink);
	tr.appendChild(nameTd)

	const authorTd = document.createElement('td')
	authorTd.className = 'tracks__elem tracks__author'
	const authorLinkEl = document.createElement('a')
	authorLinkEl.className = 'tracks__author-link'
	authorLinkEl.href = authorLink || '#'
	authorLinkEl.textContent = authorName
	authorTd.appendChild(authorLinkEl)
	tr.appendChild(authorTd)

	const durationTd = document.createElement('td')
	durationTd.className = 'tracks__elem tracks__duration'
	durationTd.textContent = duration
	tr.appendChild(durationTd)

	return tr
}

fetchSearchAuthors(query)
    .then(artistsList => {
        for(let i = 0; i < artistsList.length; i++){
            const artistCard = createGridItem({
							imageSrc: artistsList[i].image[2]['#text'],
							headerText: artistsList[i].name,
							headerLink: artistsList[i].url,
							subtext: artistsList[i].listeners + ' listeners',
						})
			searchAuthors.append(artistCard)			
        }
    });

fetchSearchAlbums(query)
	.then(albumsList => {
		for (let i = 0; i < albumsList.length; i++) {
			const albumCard = createGridItem({
				imageSrc: albumsList[i].image[2]['#text'],
				headerText: albumsList[i].name,
				headerLink: albumsList[i].url,
				subtext: albumsList[i].listeners,
			})
			searchAlbums.append(albumCard)
		}
	})

fetchSearchTracks(query)
	.then(tracksList => {
		console.log(tracksList);
		for(let i = 0; i < tracksList.length; i++){
			fetchTrackDetail(tracksList[i].name, tracksList[i].artist)
				.then(
					trackDetail => {
						const trackCard = createTrackRow({
							imageSrc: tracksList[i].image[2]['#text'],
							trackName: tracksList[i].name,
							trackLink: tracksList[i].url,
							authorName: tracksList[i].artist,
							authorLink: trackDetail.artist.url,
							duration: msToMinutesSeconds(trackDetail.duration),
						})
						searchTracks.append(trackCard)
					}
				)
		}
	})

function msToMinutesSeconds(ms) {
	const totalSeconds = Math.floor(ms / 1000);
	const minutes = Math.floor(totalSeconds / 60)
	const seconds = totalSeconds % 60
	const formattedSeconds = seconds < 10 ? '0' + seconds : seconds
	return `${minutes}:${formattedSeconds}`
}