import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import LandingPage from './LandingPage'
import ShopPage from './ShopPage'
import CartPage from './CartPage'
import { CartProvider, useCart } from './CartContext'
import './App.css'

function CartNavLink() {
  const { cart } = useCart()
  const count = cart.reduce((sum, item) => sum + item.quantity, 0)
  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      <Link to="/cart" className="fe-main-nav-link">Cart</Link>
      {count > 0 && (
        <span className="fe-cart-badge">{count}</span>
      )}
    </span>
  )
}

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="fe-container">
          <header className="fe-header">
            <h1>Fortune Essence</h1>
            <p className="fe-tagline">Affordable Luxury</p>
            <nav className="fe-main-nav">
              <Link to="/" className="fe-main-nav-link">Home</Link>
              <Link to="/shop" className="fe-main-nav-link">Shop</Link>
              <CartNavLink />
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
    </CartProvider>
  )
}

export default App
