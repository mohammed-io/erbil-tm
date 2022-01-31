import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AuthRoute } from './components/routing/auth-route'
import { Login } from './pages/login'
import { Index } from './pages/index'
import { Index as PostPlanner } from './pages/posts-planner/index'
import { Index as EventPlanner } from './pages/event-planner/index'
import './styles/index.css'

function changeType(element, type) {
  return { ...element, type }
}

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Index />} />
          {changeType(<AuthRoute path="/posts-planner/*" element={<PostPlanner />} />, Route)}
          {changeType(<AuthRoute path="/event-planner/*" element={<EventPlanner />} />, Route)}
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
