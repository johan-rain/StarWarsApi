import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import SwAPI from '../services/SwAPI'
import { getIdFromUrl } from '../helpers/helpers'
import Loading from '../components/Loading'
import NotFound from '../pages/NotFound'

export default function CharacterInfo() {
    
    const [loading, setLoading] = useState(false)
    const [movies, setMovies] = useState([])
    const [details, setCharacter] = useState([])
    const { id } = useParams()
    const navigate = useNavigate()
	const [error, setError] = useState(null)


    useEffect(() => {
		const fetchCharacter = async () => {
			setLoading(true)

			try {
				const data = await SwAPI.getCharacter(id)
				setCharacter(data)
				setMovies(data.films)
				setLoading(false)
					
			} catch (err) {
				setLoading(false)
				setError(err)
				console.log(err.message)
			}
		}

        fetchCharacter(id)

    }, [id])

    return (
		<>
			{loading && !error && <Loading />}

			{error && <NotFound />}

			<div className='d-flex justify-content-center'>
				
				{details && !error && (
					<div className='card m-4 character-character-card'>
						<h3 className='card-header text-dark'>{details.name}</h3>

						<div className='card-body'>
							<h5 className='card-title text-dark'>Attributes</h5>
						</div>
						<div className='card-body '>
							<p className='card-text text-dark'>Gender: {details.gender}</p>
							<p className='card-text text-dark'>Birth year: {details.birth_year}</p>
							<p className='card-text text-dark'>Height: {details.height}</p>
							<p className='card-text text-dark'> Mass: {details.mass}</p>
							<p className='card-text text-dark'>Hair color: {details.hair_color}</p>
							<p className='card-text text-dark'>Skin color: {details.skin_color}</p>
							<p className='card-text text-dark'>Eye color: {details.eye_color}</p>
						</div>
						<div className='card-body'>
							<h5 className='card-subtitle text-muted'>Films</h5>
						</div>
						<ul className='list-group list-group-flush'>{movies.map(film => (
							<Link key={getIdFromUrl(film)}
							    to={`/films/${getIdFromUrl(film)}`}>
                                <li className='list-group-item'>Film {getIdFromUrl(film)}</li>
							</Link>
						))}
						</ul>

						<div className='m-3'>
							<button type='button' className='btn btn-primary' onClick={() => navigate(-1)}>Go back</button>
						</div>

					</div>
				)}
			</div>
		</>
	)
}