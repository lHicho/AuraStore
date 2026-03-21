import { useState } from 'react';
import { FaEnvelope, FaLock, FaArrowRight, FaGoogle, FaApple } from 'react-icons/fa6';
import './Register.css'; // Reusing Register.css for consistent auth styling

import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../context/zustand.jsx';
import { supabase } from '../../context/supabase';

export default function Login() {
    const navigate = useNavigate();
    const setUser = useUserStore((state) => state.setUser);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { data, error: loginError } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password
            });

            if (loginError) throw loginError;

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
                            <h1>Welcome Back</h1>
                            <p>Sign in to your Aura account to continue.</p>
                        </div>

                        <form className="register-form" onSubmit={handleSubmit}>
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
                            {error && <div className="auth-error-message" style={{ color: 'var(--error)', fontSize: '0.85rem', textAlign: 'center', margin: '1rem 0', padding: '0.5rem', background: 'rgba(255,0,0,0.1)', borderRadius: '8px' }}>{error}</div>}
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

                            <button type="submit" className="submit-auth-btn" disabled={loading}>
                                <span>{loading ? 'Signing In...' : 'Sign In'}</span>
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
