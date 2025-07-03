import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import LandingPage from './LandingPage'
import ShopPage from './ShopPage'
import CartPage from './CartPage'
import './App.css'

function App() {
  return (
    <Router>
      <div className="fe-container">
        <header className="fe-header">
          <h1>Fortune Essence</h1>
          <p className="fe-tagline">Affordable Luxury</p>
          <nav className="fe-main-nav">
            <Link to="/" className="fe-main-nav-link">Home</Link>
            <Link to="/shop" className="fe-main-nav-link">Shop</Link>
            <Link to="/cart" className="fe-main-nav-link">Cart</Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </main>
        <footer className="fe-footer">
          <p>Contact: info@fortuneessence.com | &copy; {new Date().getFullYear()} Fortune Essence</p>
        </footer>
      </div>
    </Router>
  )
}

export default App
