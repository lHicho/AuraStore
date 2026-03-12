import { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaStore, FaShop, FaArrowRight, FaGoogle, FaApple } from 'react-icons/fa6';
import { FaCheckCircle } from 'react-icons/fa';
import './Register.css';

import { useNavigate } from 'react-router-dom';
import { useThemeStore, useUserStore } from '../../context/zustand.jsx';

export default function Register() {
    const navigate = useNavigate();
    const setUser = useUserStore((state) => state.setUser);
    const [role, setRole] = useState('buyer'); // 'buyer' or 'seller'
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        storeName: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Registering with data:', { role, ...formData });
        // Mock registration
        setUser({ name: formData.name, email: formData.email, role });
        navigate('/');
    };



    return (
        <section className="register-section">
            <div className="register-container">
                <div className="register-card blur-card">
                    <div className="auth-scroll-area">
                        <div className="register-header">
                            <h1>Join Aura Store</h1>
                            <p>Create your account and start your journey with us.</p>
                        </div>

                        <div className="role-selector">
                            <button
                                className={`role-btn ${role === 'buyer' ? 'active' : ''}`}
                                onClick={() => setRole('buyer')}
                            >
                                <FaShop />
                                <div className="role-info">
                                    <h3>Buyer</h3>
                                    <p>I want to shop world-class products</p>
                                </div>
                                {role === 'buyer' && <FaCheckCircle className="check-icon" />}
                            </button>

                            <button
                                className={`role-btn ${role === 'seller' ? 'active' : ''}`}
                                onClick={() => setRole('seller')}
                            >
                                <FaStore />
                                <div className="role-info">
                                    <h3>Seller</h3>
                                    <p>I want to open my online store</p>
                                </div>
                                {role === 'seller' && <FaCheckCircle className="check-icon" />}
                            </button>
                        </div>

                        <div className="social-auth-grid">
                            <button type="button" className="social-btn">
                                <FaGoogle />
                                <span>Google</span>
                            </button>
                            <button type="button" className="social-btn">
                                <FaApple />
                                <span>Apple</span>
                            </button>
                        </div>

                        <div className="auth-divider">
                            <span>OR</span>
                        </div>

                        <form className="register-form" onSubmit={handleSubmit}>
                            <div className="input-group">
                                <label><FaUser /> Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter your full name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label><FaEnvelope /> Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="name@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {role === 'seller' && (
                                <div className="input-group reveal-input">
                                    <label><FaShop /> Store Name</label>
                                    <input
                                        type="text"
                                        name="storeName"
                                        placeholder="Enter your unique store name"
                                        value={formData.storeName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            )}

                            <div className="form-row">
                                <div className="input-group">
                                    <label><FaLock /> Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="input-group">
                                    <label><FaLock /> Confirm</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="••••••••"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-footer">
                                <p className="terms-text">
                                    By signing up, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
                                </p>
                                <button type="submit" className="submit-auth-btn">
                                    <span>Complete Registration</span>
                                    <FaArrowRight />
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="auth-switch sticky-footer">
                        <p>Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>Sign in instead</a></p>
                    </div>


                </div>
            </div>
        </section>
    );
}
