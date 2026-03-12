import { useState } from 'react';
import { FaEnvelope, FaLock, FaArrowRight, FaGoogle, FaApple } from 'react-icons/fa6';
import './Register.css'; // Reusing Register.css for consistent auth styling

import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../context/zustand.jsx';

export default function Login() {
    const navigate = useNavigate();
    const setUser = useUserStore((state) => state.setUser);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Logging in with:', formData);
        // Mock login
        setUser({ name: 'User', email: formData.email });
        navigate('/');
    };



    return (
        <section className="register-section">
            <div className="register-container">
                <div className="register-card blur-card">
                    <div className="auth-scroll-area">
                        <div className="register-header">
                            <h1>Welcome Back</h1>
                            <p>Sign in to your Aura account to continue.</p>
                        </div>

                        <form className="register-form" onSubmit={handleSubmit}>
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

                            <div className="input-group">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <label><FaLock /> Password</label>
                                    <a href="#" style={{ fontSize: '11px', color: 'var(--primary)' }} onClick={(e) => e.preventDefault()}>Forgot?</a>
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <button type="submit" className="submit-auth-btn">
                                <span>Sign In</span>
                                <FaArrowRight />
                            </button>
                        </form>
                    </div>

                    <div className="auth-switch sticky-footer">
                        <p>New to Aura? <a href="#" onClick={(e) => { e.preventDefault(); navigate('/register'); }}>Create an account</a></p>
                    </div>

                </div>
            </div>
        </section>
    );
}
