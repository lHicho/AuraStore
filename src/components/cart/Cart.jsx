import "./Cart.css";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { useCartStore } from "../../context/zustand.jsx";
import { FaTrash, FaMinus, FaPlus, FaArrowLeft, FaShieldHalved, FaTruckFast, FaArrowRight, FaRotateLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function Cart() {
    const navigate = useNavigate();
    const { cart, removeFromCart, updateQuantity, clearCart } = useCartStore();

    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipping = subtotal > 500 ? 0 : (cart.length > 0 ? 15.00 : 0);
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    if (cart.length === 0) {
        return (
            <>
                <Header />
                <div className="empty-cart-view">
                    <div className="empty-content">
                        <div className="empty-icon-wrapper">
                            <span>🛒</span>
                        </div>
                        <h1>Your cart is empty</h1>
                        <p>Looks like you haven't added anything to your cart yet. Start exploring our premium collection!</p>
                        <button className="shop-btn" onClick={() => navigate('/')}>
                            <FaArrowLeft /> Start Shopping
                        </button>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <div className="cart-page">
            <Header />
            <main className="cart-main">
                <div className="cart-container">
                    <div className="cart-header">
                        <div className="header-title-group">
                            <h1>Shopping Cart <span>({cart.length} items)</span></h1>
                            <button className="clear-cart-btn" onClick={clearCart}>
                                <FaRotateLeft /> Clear Cart
                            </button>
                        </div>
                        <button className="continue-shopping" onClick={() => navigate('/')}>
                            <FaArrowLeft /> Continue Shopping
                        </button>
                    </div>

                    <div className="cart-content-grid">
                        <section className="cart-items-section">
                            <div className="items-list">
                                {cart.map((item) => (
                                    <div key={item.id} className="cart-item-card">
                                        <div className="item-image">
                                            <img src={item.image} alt={item.name} />
                                        </div>
                                        <div className="item-details">
                                            <div className="item-info-top">
                                                <div>
                                                    <span className="item-brand">{item.brand || 'Premium Brand'}</span>
                                                    <h3>{item.name}</h3>
                                                    <p className="item-meta">Category: <span>{item.category || 'General'}</span></p>
                                                    {item.description && <p className="item-desc-short">{item.description}</p>}
                                                </div>
                                                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                                                    <FaTrash />
                                                </button>
                                            </div>
                                            
                                            <div className="item-info-bottom">
                                                <div className="quantity-controls">
                                                    <button onClick={() => updateQuantity(item.id, -1)} disabled={item.quantity <= 1}>
                                                        <FaMinus />
                                                    </button>
                                                    <span className="qty-value">{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, 1)} disabled={item.quantity >= (item.limit || 10)}>
                                                        <FaPlus />
                                                    </button>
                                                </div>
                                                <div className="item-price-block">
                                                    <span className="unit-price">Unit: ${item.price.toFixed(2)}</span>
                                                    <span className="total-item-price">${(item.price * item.quantity).toFixed(2)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="cart-features">
                                <div className="feature-item">
                                    <FaShieldHalved />
                                    <div>
                                        <h4>Secure Checkout</h4>
                                        <p>Your data is always protected</p>
                                    </div>
                                </div>
                                <div className="feature-item">
                                    <FaTruckFast />
                                    <div>
                                        <h4>Fast Delivery</h4>
                                        <p>Free on orders over $500</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <aside className="cart-summary-sidebar">
                            <div className="summary-card">
                                <h2>Order Summary</h2>
                                <div className="summary-details">
                                    <div className="summary-row">
                                        <span>Order Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="summary-row">
                                        <span>Estimated Shipping</span>
                                        <span className={shipping === 0 ? "free-text" : ""}>
                                            {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                                        </span>
                                    </div>
                                    <div className="summary-row">
                                        <span>Estimated Tax (8%)</span>
                                        <span>${tax.toFixed(2)}</span>
                                    </div>
                                </div>
                                
                                <div className="promo-box">
                                    <input type="text" placeholder="Promo Code" />
                                    <button>Apply</button>
                                </div>

                                <div className="summary-total">
                                    <span>Total Price</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>

                                <button className="checkout-btn" onClick={() => console.log("Checkout clicked")}>
                                    Proceed to Checkout <FaArrowRight />
                                </button>

                                <div className="cart-additional-info">
                                    <div className="info-badge">
                                        <FaTruckFast />
                                        <span>Estimated Delivery: 2-3 Business Days</span>
                                    </div>
                                </div>

                                <div className="payment-support">
                                    <p>Safe & Secure Payment</p>
                                    <div className="payment-icons">
                                        <span className="payment-stub">VISA</span>
                                        <span className="payment-stub">MC</span>
                                        <span className="payment-stub">PP</span>
                                        <span className="payment-stub">AP</span>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
