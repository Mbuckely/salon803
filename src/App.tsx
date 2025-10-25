import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Index from './pages/Index'
import Services from './pages/Services'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/services" element={<Services />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
