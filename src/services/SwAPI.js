import axios from 'axios'

axios.defaults.baseURL = 'https://swapi.dev/api'

/**
 * Get all movies
 */

const getMovies = async () => {
	const res = await axios.get('/films')
	return res.data
}

/**
 * Get all characters
 */

const getCharacters = async page => {
	const res = await axios.get(`/people/?page=${page}`)
	return res.data
}

/**
 * Get a single movie
 */

 const getMovie = async id => {
	const res = await axios.get(`/films/${id}`)
	return res.data
}

/**
 * Get a single character
 */

 const getCharacter = async id => {
	const res = await axios.get(`/people/${id}aa`)
	return res.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	getMovies,
	getCharacters,
	getCharacter,
	getMovie,
}