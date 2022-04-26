import SwAPI from "../services/SwAPI"
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loading from "../components/Loading"
import { useSearchParams } from 'react-router-dom'

export default function Characters() {
    const [characters, setCharacters] = useState([])
	const [loading, setLoading] = useState(false)
	const [data, setData] = useState([])
	const [page, setPage] = useState(1)
	// eslint-disable-next-line
	const [searchParams, setSearchParams] = useSearchParams()

    const fetchCharacters = async () => {
		setLoading(true)
		const data = await SwAPI.getCharacters(page)
		setCharacters(data.results)
		setData(data)
		setLoading(false)

		setSearchParams({ page: page })

		console.log(data)
	}

	useEffect(() => {
		fetchCharacters()
		// eslint-disable-next-line 
	}, [page])


    return (
        <>
			{loading && <Loading />}
            <div className='d-flex flex-wrap justify-content-center'>{characters.map((character, index) => (

					<div key={index} className='card border-secondary m-3 col-md-3'>

						<div className='card-header d-flex'>
							<h2>{character.name}</h2>
						</div>

						<div className='card-body'>
							<p className='text-dark'>Gender: {character.gender}</p>
							<hr />
							<p className='text-dark'>Born: {character.birth_year}</p>
							<hr />
							<p className='text-dark'>Appears in: {character.films.length} film(s)</p>

							<Link to={`/characters/${index + 1}`}>
								<button type='button' className='btn btn-primary'>Read more</button>
							</Link>
						</div>
					</div>
				))}
			</div>

			{!loading && (
				<div className='d-flex justify-content-between align-items-center p-4'>
					<button
						disabled={!data.previous}
						onClick={() => setPage(prevValue => prevValue - 1)}
						type='button'
						className='btn btn-secondary'
					>Previous Page</button>
							
					<div className='text-light'>{page}</div>
							
					<button
						disabled={!data.next}
						onClick={() => setPage(prevValue => prevValue + 1)}
						type='button'
						className='btn btn-secondary'
			 		>Next Page</button>
				</div>
			)}	
		</>
	)		
}
