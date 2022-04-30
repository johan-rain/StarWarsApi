import SwAPI from "../services/SwAPI"
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getIdFromUrl } from '../helpers/helpers'
import Loading from "../components/Loading"
import NotFound from '../pages/NotFound'

export default function Movies() {
    const [movies, setMovies] = useState('')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchMovies = async () => {
			setLoading(true)

			try {
				const data = await SwAPI.getMovies()
				setMovies(data)
				setLoading(false)
			
			} catch (err) {
				setLoading(false)
				setError(err)
				console.log(err.message)
			}			
		}

		fetchMovies()

	}, [])

	return (
		<>
			{loading && !error && <Loading />}

			{error && <NotFound />}

			<div className='d-flex flex-wrap justify-content-center'>
				{movies && !error && movies.results.map(film => (

						<div key={film.episode_id} className='card border-secondary m-4 col-md-3'>

							<div className='card-header d-flex'>
								<h2>{film.title}</h2>
							</div>

							<div className='card-body'>
								<p>Episode: {film.episode_id}</p>
								<hr />
								<p>Released: {film.release_date}</p>
								<hr />
								<p>Characters: {film.characters.length}</p>

								<Link to={`/films/${getIdFromUrl(film.url)}`}>
									<button className='btn btn-primary'>Read more</button>
								</Link>
							</div>
						</div>
					))}
			</div>
		</>
	)
}