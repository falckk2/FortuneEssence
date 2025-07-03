import './App.css'

export default function ShopPage() {
    // Placeholder: In a real app, products would come from props or API
    const product = {
        id: 1,
        name: 'Pure Lavender Oil',
        description: 'Premium quality, 30ml bottle',
        price: 19.99,
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
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
                        <button className="fe-shop-btn">Add to Cart</button>
                    </div>
                </div>
            </div>
        </section>
    )
} 