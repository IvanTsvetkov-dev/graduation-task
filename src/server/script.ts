const API_KEY = 'ed9e49dfc86dac76ededc94d4fdeeb24'
const BASE_URL = 'http://ws.audioscrobbler.com/2.0/'

/** 
* Общая функция, которая асинхронно запрашивает данные с API в соотвествии с чартами
* В случае успешного ответа возвращает промис
* В случае ошибки выбрасывает исключение с описанием проблемы
* @param {string} method название метода: chart.gettoptracks и тд.
* @param {number} limit количество записей.
* @return {promise} Возвращает промис, fulfilled: Массив объектов жанр, rejected: данные об ошибке.
* @throws {error} Если код ответа не 200 или структура данных не корректна
*/
export async function fetchTopData(option: { method: string; limit: number}) {
	try {
		const response = await fetch(
			`${BASE_URL}?method=${option.method}&api_key=${API_KEY}&format=json&limit=${option.limit}`
		)
		if (response.status !== 200)
			throw new Error(`Error! Http code: ${response.status}`);
		const data = await response.json();
		if (!data) {
			throw new Error(`There isn't data`);
		}
		return data;
	} catch (e) {
		throw Error(String(e));
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
export async function fetchTopAuthorsTags(artistName: string){
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
		throw Error(String(e));
	}
}

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
export async function fetchSearchData(option : {method: string, paramName: string, paramValue: string, limit: string}): Promise<any>{
	try {
		const response = await fetch(
			`${BASE_URL}?method=${option.method}&${option.paramName}=${option.paramValue}&api_key=${API_KEY}&format=json&limit=${option.limit}`
		)
		if (response.status !== 200)
			throw new Error(`Error! Http code: ${response.status}`)
		const data = await response.json()
		if (!data) {
			throw new Error(`There isn't data`)
		}
		return data
	} catch (e) {
		throw Error(String(e))
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
export async function fetchTrackDetail(trackName: string, artistName: string){
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
		throw Error(String(e))
	}
}
/** 
* Переводит ms в формат mm:ss.
* @param {Number} params.duration - Продолжительность трека.
* @returns {HTMLElement} DOM-элемент `<tr>` грид ячейка с данными о треке.
*/
export function msToMinutesSeconds(ms: number) {
	const totalSeconds = Math.floor(ms / 1000);
	const minutes = Math.floor(totalSeconds / 60)
	const seconds = totalSeconds % 60
	const formattedSeconds = seconds < 10 ? '0' + seconds : seconds
	return `${minutes}:${formattedSeconds}`
}