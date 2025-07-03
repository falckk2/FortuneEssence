import './App.css'
import { useState } from 'react'
import { useCart } from './CartContext'

export default function ShopPage() {
    const { addToCart } = useCart()
    const [added, setAdded] = useState(false)
    const [qty, setQty] = useState(1)
    // Placeholder: In a real app, products would come from props or API
    const product = {
        id: 1,
        name: 'Pure Lavender Oil',
        description: 'Premium quality, 30ml bottle',
        price: 19.99,
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    }

    function handleAddToCart() {
        for (let i = 0; i < qty; i++) {
            addToCart(product)
        }
        setAdded(true)
        setTimeout(() => setAdded(false), 1200)
    }

    return (
        <section className="fe-section fe-shop">
            <h3>Shop Essential Oils</h3>
            <div className="fe-product-card">
                <img src={product.image} alt={product.name} className="fe-product-img" />
                <div className="fe-product-info">
                    <h4 className="fe-lavender-title">{product.name}</h4>
                    <p>{product.description}</p>
                    <div className="fe-product-bottom">
                        <span className="fe-product-price">${product.price.toFixed(2)}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <input
                                type="number"
                                min={1}
                                value={qty}
                                onChange={e => setQty(Math.max(1, Number(e.target.value)))}
                                className="fe-cart-qty"
                                style={{ width: '3rem' }}
                            />
                            <button className="fe-shop-btn" onClick={handleAddToCart} disabled={added}>
                                {added ? 'Added!' : 'Add to Cart'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
} 