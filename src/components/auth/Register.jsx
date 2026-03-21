import { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaStore, FaShop, FaArrowRight, FaApple, FaGoogle } from 'react-icons/fa6';
import { FaCheckCircle } from 'react-icons/fa';
import './Register.css';

import { useNavigate } from 'react-router-dom';
import { useThemeStore, useUserStore } from '../../context/zustand.jsx';
import { supabase } from '../../context/supabase';

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

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            const { data, error: signUpError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        full_name: formData.name,
                        role: role
                    }
                }
            });

            if (signUpError) throw signUpError;

            if (data?.user) {
                setUser(data.user);
                navigate('/');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const signInWithGoogle = async () => {
        const { data, error: googleError } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                queryParams: {
                    access_type: 'offline',
                    prompt: 'consent',
                },
            },
        });
        if (googleError) setError(googleError.message);
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
                            <button type="button" className="social-btn" onClick={signInWithGoogle}>
                                <FaGoogle />
                                <span>Google</span>
                            </button>
                            <button type="button" className="social-btn">
                                <FaApple />
                                <span>Apple</span>
                            </button>
                        </div>

                        {error && <div className="auth-error-message" style={{ color: 'var(--error)', fontSize: '0.85rem', textAlign: 'center', marginBottom: '1rem', padding: '0.5rem', background: 'rgba(255,0,0,0.1)', borderRadius: '8px' }}>{error}</div>}

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
                                <button type="submit" className="submit-auth-btn" disabled={loading}>
                                    <span>{loading ? 'Creating Account...' : 'Complete Registration'}</span>
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
