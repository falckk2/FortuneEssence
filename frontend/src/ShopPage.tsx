import './App.css'
import { useState, useEffect } from 'react'
import { useCart } from './CartContext'

export default function ShopPage() {
    const { addToCart } = useCart()
    const [addedId, setAddedId] = useState<number | null>(null)
    const [qty, setQty] = useState<{ [id: number]: number }>({})
    const [products, setProducts] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetch('http://localhost:5211/api/products')
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch products')
                return res.json()
            })
            .then(data => {
                setProducts(data)
                setLoading(false)
            })
            .catch(err => {
                setError(err.message)
                setLoading(false)
            })
    }, [])

    function handleAddToCart(product: any) {
        const quantity = qty[product.id] || 1
        for (let i = 0; i < quantity; i++) {
            addToCart(product)
        }
        setAddedId(product.id)
        setTimeout(() => setAddedId(null), 1200)
    }

    if (loading) return <section className="fe-section fe-shop"><p>Loading...</p></section>
    if (error) return <section className="fe-section fe-shop"><p>Error: {error}</p></section>

    return (
        <section className="fe-section fe-shop">
            <h3>Shop Essential Oils</h3>
            {products.length === 0 ? <p>No products found.</p> : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
                    {products.map(product => (
                        <div className="fe-product-card" key={product.id}>
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
                                            value={qty[product.id] || 1}
                                            onChange={e => setQty(q => ({ ...q, [product.id]: Math.max(1, Number(e.target.value)) }))}
                                            className="fe-cart-qty"
                                            style={{ width: '3rem' }}
                                        />
                                        <button className="fe-shop-btn" onClick={() => handleAddToCart(product)} disabled={addedId === product.id}>
                                            {addedId === product.id ? 'Added!' : 'Add to Cart'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    )
} 