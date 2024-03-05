import './App.css'
import Navbar from './components/Navbar';
import Blog from './pages/Blog';
import Login from './pages/Login';
import Home from './pages/Home';

import { BrowserRouter , Routes , Route} from 'react-router-dom'
function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/auth" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
