import SwAPI from "../services/SwAPI"
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getIdFromUrl } from '../helpers/helpers'

export default function Movies() {
    const [movies, setMovies] = useState('')

	const fetchMovies = async () => {
		const data = await SwAPI.getMovies()
		setMovies(data)
	}

	useEffect(() => {
		fetchMovies()
	}, [])

	return (
		<>
			<div className='d-flex flex-wrap justify-content-center'>
				{movies && movies.results.map(film => (

						<div key={film.episode_id} className='card border-secondary m-4 col-md-3 col-sm-4'>

							<div className='card-header d-flex align-items-center'>
								<h2>{film.title}</h2>
							</div>

							<div className='card-body'>
								<p>
									<span>Episode: {film.episode_id}</span>	
								</p>
								<hr />
								<p>
									<span>Released: {film.release_date}</span>	
								</p>
								<hr />
								<p>
									<span>Characters: {film.characters.length}</span>	
								</p>

								<Link to={`/films/${getIdFromUrl(film.url)}`}>
									<button className='btn btn-secondary'>
										Read more
									</button>
								</Link>
							</div>
						</div>
					))}
			</div>
		</>
	)
}