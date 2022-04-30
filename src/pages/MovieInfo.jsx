import SwAPI from "../services/SwAPI"
import { useEffect, useState } from 'react'
import Loading from "../components/Loading"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getIdFromUrl } from '../helpers/helpers'
import NotFound from '../pages/NotFound'

export default function MovieInfo() {
    const [loading, setLoading] = useState(false)
    const [details, setDetails] = useState([])
    const [characters, setCharacters] = useState([])
    const { id } = useParams()
    const navigate = useNavigate()
	const [error, setError] = useState(null)

    useEffect(() => {
		const fetchMovieInfo = async () => {
			setLoading(true)

			try {
				const data = await SwAPI.getMovie(id)
				setDetails(data)
				setCharacters(data.characters)
				setLoading(false)
				
			} catch (err) {
				setLoading(false)
        		setError(err)
        		console.log(err.message)
			}	
		}

		fetchMovieInfo(id)
		
	}, [id])

    return (
		<>
			{loading && !error && <Loading />}

			{error && <NotFound />}

			<div className='d-flex  justify-content-center'>
				
				{details && !error && (
					<div className='card m-4 character-details-card'>
						<h3 className='card-header text-dark'>{details.title}</h3>

						<div className='card-body'>
							<h5 className='card-title text-dark'>Attributes</h5>
						</div>

						<div className='card-body '>
							<p className='card-text text-dark'>Episode: {details.episode_id}</p>
							<p className='card-text text-dark'>Director(s): {details.director}</p>
							<p className='card-text text-dark'>Producer(s): {details.producer}</p>
							<p className='card-text text-dark'>Release date: {details.release_date}</p>
						</div>

						<div className='card-body'>
							<h5 className='card-title text-dark'>Links</h5>
							<h6 className='card-subtitle text-muted'>Characters</h6>
						</div>

						<ul className='list-group list-group-flush'>{characters.map(character => (
							<Link key={getIdFromUrl(character)} to={`/characters/${getIdFromUrl(character)}`}>
								<li className='list-group-item'>Character {getIdFromUrl(character)}</li>
							</Link>
							))}
						</ul>

					</div>
				)}
			</div>

			<div>
				<button type='button' className='btn btn-primary' onClick={() => navigate(-1)}>
					Go back
				</button>
			</div>
		</>
	)
}