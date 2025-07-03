import './App.css'
import { useCart } from './CartContext'

export default function CartPage() {
    const { cart, updateQuantity, removeFromCart } = useCart()
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

    return (
        <section className="fe-section fe-cart">
            <h3>Your Cart</h3>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="fe-cart-list">
                    {cart.map((item) => (
                        <div className="fe-cart-item" key={item.id}>
                            <img src={item.image} alt={item.name} className="fe-cart-img" />
                            <div className="fe-cart-info">
                                <h4>{item.name}</h4>
                                <div className="fe-cart-controls">
                                    <label>
                                        Qty:
                                        <input
                                            type="number"
                                            min={1}
                                            value={item.quantity}
                                            onChange={e => updateQuantity(item.id, Number(e.target.value))}
                                            className="fe-cart-qty"
                                        />
                                    </label>
                                    <button className="fe-cart-remove" onClick={() => removeFromCart(item.id)}>
                                        Remove
                                    </button>
                                </div>
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