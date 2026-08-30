import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import BrowseEvents from './pages/BrowseEvents'
import EventDetails from './pages/EventDetails'

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        {/* The Basketball listing is the landing screen; Home is its own route. */}
        <Route path="/" element={<BrowseEvents />} />
        <Route path="/home" element={<Home />} />
        <Route path="/events/:eventId" element={<EventDetails />} />
        {/* /browse was the listing's route for a while — keep old links working. */}
        <Route path="/browse" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  )
}
