import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CreateRecipe from './pages/CreateRecipe'
import SavedRecipes from './pages/SavedRecipes'
import Auth from './pages/Auth'
import Navbar from './components/Navbar'
import RecipePage from './pages/RecipePage'

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/createRecipe' element={<CreateRecipe />}/>
        <Route path='/savedRecipes' element={<SavedRecipes />}/>
        <Route path='/auth' element={<Auth />} />
        <Route path='/recipe/:id' element={<RecipePage />} />
        <Route path='*' element={<>Page not found 404</>}/>
      </Routes>
    </Router>
  )
}

export default App
