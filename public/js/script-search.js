const API_KEY = '18c671e0779ec3b93335884680854000'
const BASE_URL = 'http://ws.audioscrobbler.com/2.0/'

/* Ссылки на DOM элементы */
const searchString = document.querySelector('.search-section__header');
const searchAuthors = document.querySelector('.artists__grid-items');
const searchAlbums = document.querySelector('.albums__grid-items')
const searchTracks = document.querySelector('.tracks__body');

/* Вытягивание query параметров */
const params = new URLSearchParams(window.location.search);
const query = params.get('query');

searchString.textContent = `Search results for "${query}"`;

/** 
* Общая функция, которая асинхронно запрашивает данные с API в соотвествии с поисковым запросом. 
* В случае успешного ответа возвращает промис
* В случае ошибки выбрасывает исключение с описанием проблемы.
* @param {string} method имя метода: track.search, album.search и тд.
* @param {string} paramName имя параметра поиска: track, album и тд.
* @param {string} paramValue значение параметра поиска.
* @param {string} limit максимальное число полученных записей.
* @return {promise} Возвращает промис, fulfilled: Массив объектов авторов, rejected: данные об ошибке.
* @throws {error} Если код ответа не 200 или структура данных не корректна
*/
async function fetchSearchData({method, paramName, paramValue, limit = 10}){
	try {
		const response = await fetch(
			`${BASE_URL}?method=${method}&${paramName}=${paramValue}&api_key=${API_KEY}&format=json&limit=${limit}`
		)
		if (response.status != 200)
			throw new Error(`Error! Http code: ${response.status}`)
		const data = await response.json()
		if (!data) {
			throw new Error(`There isn't data`)
		}
		return data
	} catch (e) {
		throw Error(e)
	}
}
/** 
* Асинхронно запрашивает подробные данные о треке
* В случае успешного ответа возвращает промис
* В случае ошибки выбрасывает исключение с описанием проблемы
* @param {string} trackName название трека.
* @param {string} artistName псевдоним(имя) артиста.
* @return {promise} Возвращает промис, fulfilled: Объект трек, rejected: данные об ошибке.
* @throws {error} Если код ответа не 200 или структура данных не корректна
*/
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
/** 
* Создаёт DOM-элемент универсальную ячейку грид(используется как для отрисовки авторов, так и альбомов).
* @param {object} params - Параметры для создания ячейки.
* @param {string} params.imgSrc - URL изображения автора.
* @param {string} params.headerText - Название карточки.
* @param {string} params.headerLink - Ссылка на подробности карточки.
* @param {string} params.subtext - Подзаголовок карточки.
* @returns {HTMLElement} DOM-элемент `<li>` с грид ячейкой.
*/
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
/** 
* Создаёт DOM-элемент ячейка таблицы с треком.
* @param {object} params - Параметры для создания ячеки.
* @param {string} params.imgaSrc - URL изображения картинка трека.
* @param {string} params.trackName - Название трека.
* @param {string} params.trackLink - URL трека.
* @param {string} params.authorName - Имя автора.
* @param {string} params.authorLink - URL автора.
* @param {string} params.duration - Продолжительность трека.
* @returns {HTMLElement} DOM-элемент `<tr>` грид ячейка с данными о треке.
*/
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
/* Запрос артистов в соответсвии с поисковым запросом */
fetchSearchData({
	method: 'artist.search',
	paramName: 'artist',
	paramValue: query,
	limit: 8,
})
	.then(data => {
		try {
			const artistsList = data.results.artistmatches.artist
			for (let i = 0; i < artistsList.length; i++) {
				const artistCard = createGridItem({
					imageSrc: artistsList[i].image[2]['#text'],
					headerText: artistsList[i].name,
					headerLink: artistsList[i].url,
					subtext: artistsList[i].listeners + ' listeners',
				})
				searchAuthors.append(artistCard)
			}
		} catch (e) {
			console.error('The object have invalid key')
		}
	})
	.catch(err =>
		console.error(err)
	)
/* Запрос альбомов в соответствии с поисковым запросом */
fetchSearchData({
	method: 'album.search',
	paramName: 'album',
	paramValue: query,
	limit: 8,
	})
	.then(data => {
		try{
			const albumsList = data.results.albummatches.album;
			for (let i = 0; i < albumsList.length; i++) {
				const albumCard = createGridItem({
					imageSrc: albumsList[i].image[2]['#text'],
					headerText: albumsList[i].name,
					headerLink: albumsList[i].url,
					subtext: albumsList[i].listeners,
				})
				searchAlbums.append(albumCard)
			}
		} catch(e){
			console.error(e);
		}
	})
	.catch(err => console.error(err));
/* Запрос треков в соответствии с поисковым запросом */
fetchSearchData({
	method: 'track.search',
	paramName: 'track',
	paramValue: query,
	limit: 8,
})
	.then(data => {
		const tracksList = data.results.trackmatches.track;
		for (let i = 0; i < tracksList.length; i++) {
			fetchTrackDetail(tracksList[i].name, tracksList[i].artist).then(
				trackDetail => {
					const trackCard = createTrackRow({
						imageSrc: tracksList[i].image[2]['#text'],
						trackName: tracksList[i].name,
						trackLink: tracksList[i].url,
						authorName: tracksList[i].artist,
						authorLink: trackDetail.artist.url,
						duration: msToMinutesSeconds(Number(trackDetail.duration)),
					})
					searchTracks.append(trackCard)
				}
			)
		}
	})
	.catch(err => console.error(err))
/** 
* Переводит ms в формат mm:ss.
* @param {Number} params.duration - Продолжительность трека.
* @returns {HTMLElement} DOM-элемент `<tr>` грид ячейка с данными о треке.
*/
function msToMinutesSeconds(ms) {
	const totalSeconds = Math.floor(ms / 1000);
	const minutes = Math.floor(totalSeconds / 60)
	const seconds = totalSeconds % 60
	const formattedSeconds = seconds < 10 ? '0' + seconds : seconds
	return `${minutes}:${formattedSeconds}`
}