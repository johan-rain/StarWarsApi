import './App.css'
import "bootstrap/dist/css/bootstrap.css"
import Navigation from './components/Navigation'
import Homepage from './pages/HomePage'
import Characters from './pages/Characters'
import CharacterInfo from './pages/CharacterInfo'
import Movies from './pages/Movies'
import MovieInfo from './pages/MovieInfo'
import NotFound from './pages/NotFound'
import { Route, Routes } from 'react-router-dom'

function App() {
	return (
		<div className='App'>
			<Navigation />

			<Routes>
				<Route path='/' element={<Homepage />} />
				<Route path='/characters/' element={<Characters />} />
				<Route path='/films/' element={<Movies />} />
				<Route path='/characters/:id' element={<CharacterInfo />} />
				<Route path='/films/:id' element={<MovieInfo />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</div>
	)
}

export default App