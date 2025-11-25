const API_KEY = '18c671e0779ec3b93335884680854000'
const BASE_URL = 'http://ws.audioscrobbler.com/2.0/'

/* Ссылки на DOM элементы */
const artistsList = document.querySelector('.authors-section__authors-list');
const tracksListLink = document.querySelector('.tracks-section_popular-list')

/** 
* Общая функция, которая асинхронно запрашивает данные с API в соотвествии с чартами
* В случае успешного ответа возвращает промис
* В случае ошибки выбрасывает исключение с описанием проблемы
* @param {string} method название метода: chart.gettoptracks и тд.
* @param {number} limit количество записей.
* @return {promise} Возвращает промис, fulfilled: Массив объектов жанр, rejected: данные об ошибке.
* @throws {error} Если код ответа не 200 или структура данных не корректна
*/
async function fetchTopData({ method, limit = 10 }) {
	try {
		const response = await fetch(
			`${BASE_URL}?method=${method}&api_key=${API_KEY}&format=json&limit=${limit}`
		)
		if (response.status != 200)
			throw new Error(`Error! Http code: ${response.status}`)
		const data = await response.json()
		if (!data) {
			throw new Error(`There isn't data`)
		}
		return data;
	} catch (e) {
		throw Error(e)
	}
}
/** 
* Асинхронно запрашивает данные о топ жанрах артиста
* В случае успешного ответа возвращает промис
* В случае ошибки выбрасывает исключение с описанием проблемы
* @param {string} artistName имя артиста 
* @return {promise} Возвращает промис, fulfilled: Массив объектов жанр, rejected: данные об ошибке.
* @throws {error} Если код ответа не 200 или структура данных не корректна
*/
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
/** 
* Создаёт DOM-элемент карточки автора.
* @param {object} params - Параметры для создания карточки автора.
* @param {string} params.imgSrc - URL изображения автора.
* @param {string} params.authorName - Имя автора.
* @param {string} params.authorUrl - Ссылка на страницу автора.
* @returns {HTMLElement} DOM-элемент `<article>` с карточкой автора.
*/
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
/**
 * Создаёт DOM-элемент карточки трека.
 *
 * @param {object} params - Параметры для создания карточки трека.
 * @param {object} params.track - Информация о треке.
 * @param {string} params.track.trackName - Название трека.
 * @param {string} params.track.trackSrc - URL изображения трека.
 * @param {string} params.track.trackUrl - Ссылка на страницу трека.
 * @param {object} params.author - Информация об авторе.
 * @param {string} params.author.authorName - Имя автора.
 * @param {string} params.author.authorUrl - Ссылка на страницу автора.
 * @returns {HTMLElement} DOM-элемент `<article>` с карточкой трека.
 */
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
		.catch(err => console.error(err))
		

	infoDiv.appendChild(ul)
	article.appendChild(infoDiv)

	return article
}
/* Запрос топ авторов и их рендеринг */
fetchTopData({
	method: 'chart.gettopartists',
	limit: 12,
})
	.then(data => {
		try {
			const artists = data.artists.artist
			for (let i = 0; i < artists.length; i++) {
				const authorCard = createAuthorCard({
					imgSrc: artists[i].image[2]['#text'],
					authorName: artists[i].name,
					authorUrl: artists[i].url,
				})
				artistsList.append(authorCard)
			}
		} catch (e) {
			console.error(e)
		}
	})
	.catch(err => console.error(err))
/* Запрос топ треков и их рендеринг */
fetchTopData({
	method: 'chart.gettoptracks',
	limit: 18,
})
	.then(data => {
		try {
			const tracks = data.tracks.track
			for (let i = 0; i < tracks.length; i++) {
				const trackCard = createTrackCard({
					track: {
						trackName: tracks[i].name,
						trackSrc: tracks[i].image[2]['#text'],
						trackUrl: tracks[i].url,
					},
					author: {
						authorName: tracks[i].artist.name,
						authorUrl: tracks[i].artist.url,
					},
				})
				tracksListLink.append(trackCard)
			}
		} catch (e) {
			console.error(e)
		}
	})
	.catch(err => console.error(err))