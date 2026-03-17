import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import { useCartStore } from '../../context/zustand.jsx';
import { 
    FaTruckFast, FaCreditCard, FaCircleCheck, FaChevronRight, 
    FaLocationDot, FaLock, FaBuildingColumns, FaArrowLeft, FaReceipt
} from 'react-icons/fa6';
import './Checkout.css';

export default function Checkout() {
    const navigate = useNavigate();
    const { cart, clearCart } = useCartStore();
    const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success
    const [orderNumber] = useState(`AURA-${Math.floor(100000 + Math.random() * 900000)}`);
    
    const [shippingData, setShippingData] = useState({
        fullName: '',
        email: '',
        address: '',
        city: '',
        zip: '',
        country: 'United States'
    });

    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipping = subtotal > 500 ? 0 : 15.00;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    const handleShippingSubmit = (e) => {
        e.preventDefault();
        setStep(2);
    };

    const handlePaymentSubmit = (e) => {
        e.preventDefault();
        // Here we would typically integrate Stripe
        setStep(3);
        // Clear cart after success
        setTimeout(() => {
            // We'll clear it when they close the screen or on final step
        }, 1000);
    };

    const handleFinalize = () => {
        clearCart();
        navigate('/');
    };

    if (cart.length === 0 && step !== 3) {
        navigate('/cart');
        return null;
    }

    return (
        <div className="checkout-page">
            <Header />
            
            <main className="checkout-main">
                <div className="checkout-container">
                    {/* Stepper */}
                    <nav className="checkout-stepper">
                        <div className={`step-item ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
                            <div className="step-count">{step > 1 ? <FaCircleCheck /> : '1'}</div>
                            <span className="step-label">Shipping</span>
                        </div>
                        <div className="step-connector"></div>
                        <div className={`step-item ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
                            <div className="step-count">{step > 2 ? <FaCircleCheck /> : '2'}</div>
                            <span className="step-label">Payment</span>
                        </div>
                        <div className="step-connector"></div>
                        <div className={`step-item ${step === 3 ? 'active' : ''}`}>
                            <div className="step-count">3</div>
                            <span className="step-label">Confirmation</span>
                        </div>
                    </nav>

                    <div className={`checkout-grid ${step === 3 ? 'one-column' : ''}`}>
                        <div className="checkout-form-area">
                            {step === 1 && (
                                <section className="step-panel reveal active">
                                    <div className="panel-header">
                                        <h2><FaLocationDot /> Shipping Information</h2>
                                        <p>Enter your delivery details below</p>
                                    </div>
                                    <form onSubmit={handleShippingSubmit} className="checkout-form">
                                        <div className="form-group full">
                                            <label>Full Name</label>
                                            <input type="text" required placeholder="John Doe" 
                                                value={shippingData.fullName} 
                                                onChange={(e) => setShippingData({...shippingData, fullName: e.target.value})} />
                                        </div>
                                        <div className="form-group full">
                                            <label>Email Address</label>
                                            <input type="email" required placeholder="john@example.com" 
                                                value={shippingData.email}
                                                onChange={(e) => setShippingData({...shippingData, email: e.target.value})} />
                                        </div>
                                        <div className="form-group full">
                                            <label>Street Address</label>
                                            <input type="text" required placeholder="123 Aura St, Tech District"
                                                value={shippingData.address}
                                                onChange={(e) => setShippingData({...shippingData, address: e.target.value})} />
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>City</label>
                                                <input type="text" required placeholder="San Francisco"
                                                    value={shippingData.city}
                                                    onChange={(e) => setShippingData({...shippingData, city: e.target.value})} />
                                            </div>
                                            <div className="form-group">
                                                <label>ZIP / Postal Code</label>
                                                <input type="text" required placeholder="94103"
                                                    value={shippingData.zip}
                                                    onChange={(e) => setShippingData({...shippingData, zip: e.target.value})} />
                                            </div>
                                        </div>
                                        <button type="submit" className="next-step-btn">
                                            Continue to Payment <FaChevronRight />
                                        </button>
                                    </form>
                                </section>
                            )}

                            {step === 2 && (
                                <section className="step-panel reveal active">
                                    <div className="panel-header">
                                        <button className="back-btn" onClick={() => setStep(1)}><FaArrowLeft /></button>
                                        <h2><FaCreditCard /> Secure Payment</h2>
                                        <p>All transactions are encrypted and secure</p>
                                    </div>
                                    
                                    <div className="saved-cards-mock">
                                        <p className="sub-label">Choose Payment Method</p>
                                        <div className="payment-options">
                                            <div className="payment-option-card active">
                                                <FaCreditCard className="pay-icon" />
                                                <div className="pay-txt">
                                                    <span>Credit / Debit Card</span>
                                                    <small>Safe & Secure via Stripe</small>
                                                </div>
                                                <div className="radio-dot"></div>
                                            </div>
                                            <div className="payment-option-card disabled">
                                                <FaBuildingColumns className="pay-icon" />
                                                <div className="pay-txt">
                                                    <span>Bank Transfer</span>
                                                    <small>Coming soon</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <form onSubmit={handlePaymentSubmit} className="checkout-form stripe-mock">
                                        <div className="form-group full">
                                            <label>Card Number</label>
                                            <div className="input-with-icon">
                                                <FaCreditCard />
                                                <input type="text" required placeholder="4242 4242 4242 4242" maxLength="19" />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>Expiry Date</label>
                                                <input type="text" required placeholder="MM / YY" maxLength="5" />
                                            </div>
                                            <div className="form-group">
                                                <label>CVC / CVV</label>
                                                <input type="text" required placeholder="123" maxLength="4" />
                                            </div>
                                        </div>
                                        
                                        <div className="secure-badge">
                                            <FaLock />
                                            <span>Secure Encrypted Transaction</span>
                                        </div>

                                        <button type="submit" className="next-step-btn payment-btn">
                                            Complete Order <FaChevronRight />
                                        </button>
                                    </form>
                                </section>
                            )}

                            {step === 3 && (
                                <section className="step-panel success-panel reveal active">
                                    <div className="success-icon">
                                        <FaCircleCheck />
                                    </div>
                                    <h2>Order Confirmed!</h2>
                                    <p>Thank you for your purchase. We've received your order.</p>
                                    
                                    <div className="order-tag">
                                        <span>Order Number:</span>
                                        <strong>{orderNumber}</strong>
                                    </div>

                                    <div className="order-summary-box">
                                        <h3>Order Details</h3>
                                        <div className="mini-items">
                                            {cart.map(item => (
                                                <div key={item.id} className="mini-item">
                                                    <span>{item.name} (x{item.quantity})</span>
                                                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="summary-footer">
                                            <div className="final-row">
                                                <span>Total Paid:</span>
                                                <strong>${total.toFixed(2)}</strong>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="delivery-estimate">
                                        <FaTruckFast />
                                        <span>Estimated Delivery: <strong>2-3 Business Days</strong></span>
                                    </div>

                                    <button className="finish-btn" onClick={handleFinalize}>
                                        Back to Homepage
                                    </button>
                                </section>
                            )}
                        </div>

                        {step !== 3 && (
                            <aside className="checkout-sidebar">
                                <div className="order-preview-panel">
                                    <h3>Order Summary</h3>
                                    <div className="preview-items">
                                        {cart.map(item => (
                                            <div key={item.id} className="preview-item">
                                                <div className="pv-img">
                                                    <img src={item.image} alt="" />
                                                </div>
                                                <div className="pv-info">
                                                    <h4>{item.name}</h4>
                                                    <span>Qty: {item.quantity}</span>
                                                </div>
                                                <span className="pv-price">${(item.price * item.quantity).toFixed(2)}</span>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    <div className="preview-billing">
                                        <div className="bill-row">
                                            <span>Subtotal</span>
                                            <span>${subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="bill-row">
                                            <span>Shipping</span>
                                            <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                                        </div>
                                        <div className="bill-row">
                                            <span>Tax (8%)</span>
                                            <span>${tax.toFixed(2)}</span>
                                        </div>
                                        <div className="bill-row total">
                                            <span>Final Total</span>
                                            <span>${total.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <div className="secure-guarantee">
                                        <FaShieldHalved />
                                        <span>Aura Guaranteed Safe Checkout</span>
                                    </div>
                                </div>
                            </aside>
                        )}
                    </div>
                </div>
            </main>
            
            <Footer />
        </div>
    );
}

function FaShieldHalved(props) {
    return <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M256 0c11.5 0 22.4 6.2 28.3 16.3l12.4 20.6c1.1 1.9 2.5 3.5 4.3 4.7l21.3 14.2c10.4 6.9 14.8 20.2 10.6 31.8l-7.7 21.2c-.8 2.1-1 4.4-.6 6.6l4.4 23.3c2.4 12.5-3.8 24.8-15.1 30.2l-21.2 10c-2 1-3.6 2.6-4.6 4.5l-11.8 21.2c-6.1 11.1-18.7 16.8-30.8 13.9l-22.9-5.5c-2.1-.5-4.4-.4-6.5 .3l-22.1 7.1c-12 3.9-25-.8-31.5-11.6l-12.3-20.6c-1.1-1.9-2.7-3.4-4.6-4.4l-21.2-11.3c-11.3-6-16.7-19-12.8-31.1l7-21.5c.7-2.1 .8-4.4 .3-6.6l-5.6-23.1c-3-12.3 2-25.1 12.3-31.4l20.4-12.5c1.9-1.2 3.3-2.9 4.2-4.9l10-22c5.4-11.9 18.2-18.4 30.9-15.7l23 4.9c2.2 .5 4.4 .4 6.6-.2l22.6-6.1c2.1-.5 4.2-1.5 6.1-2.9L256 0zm0 128a128 128 0 1 0 0 256 128 128 0 1 0 0-256zM176 256a80 80 0 1 1 160 0 80 80 0 1 1-160 0z"></path></svg>;
}
