import './App.css'

export default function CartPage() {
    // Placeholder: In a real app, cart items would come from state or context
    const cartItems = [
        {
            id: 1,
            name: 'Pure Lavender Oil',
            price: 19.99,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
        },
    ]
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

    return (
        <section className="fe-section fe-cart">
            <h3>Your Cart</h3>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="fe-cart-list">
                    {cartItems.map((item) => (
                        <div className="fe-cart-item" key={item.id}>
                            <img src={item.image} alt={item.name} className="fe-cart-img" />
                            <div className="fe-cart-info">
                                <h4>{item.name}</h4>
                                <p>Quantity: {item.quantity}</p>
                                <span className="fe-product-price">${item.price.toFixed(2)}</span>
                            </div>
                        </div>
                    ))}
                    <div className="fe-cart-total">
                        <strong>Total: ${total.toFixed(2)}</strong>
                    </div>
                    <button className="fe-shop-btn">Checkout</button>
                </div>
            )}
        </section>
    )
} 