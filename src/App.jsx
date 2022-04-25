import './App.css';
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Navigation />

        <Routes>
          <Route path='/' element={< />} />
          <Route path='/characters' element={< />} />
          <Route path='/films' element={< />} />
          <Route path='/characters/:id' element={< />} />
          <Route path='/films/:id' element={< />} />
          <Route path='*' element={< />} />
        </Routes>

    </div>
  );
}

export default App;
