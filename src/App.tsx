import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import BrowseEvents from './pages/BrowseEvents'
import EventDetails from './pages/EventDetails'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<BrowseEvents />} />
        <Route path="/events/:eventId" element={<EventDetails />} />
      </Routes>
    </HashRouter>
  )
}
